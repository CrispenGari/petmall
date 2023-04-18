import {
  Arg,
  Ctx,
  Mutation,
  PubSub,
  PubSubEngine,
  Query,
  Resolver,
  Root,
  Subscription,
} from "type-graphql";
import {
  DeletePetInputType,
  GetCategoryPetsInput,
  GetPetByIdInput,
  MarkAsSoldInput,
  NewPetInputType,
  UpdatePetInputType,
} from "./inputs/inputTypes";
import stream from "stream";
import util from "util";
import fs from "fs";
import path from "path";
import { Events, __storageBaseURL__ } from "../../constants";
import { CtxType } from "../../types";
import { verifyJwt } from "../../utils";
import {
  CategoryPetSubscription,
  PetInteractionType,
  PetObjectType,
  PetsObjectType,
} from "./objects/objectTypes";

const storageDir = path.join(
  __dirname
    .replace("dist\\resolvers\\pet", "")
    .replace("src\\resolvers\\pet", ""),
  "storage"
);
const pipeline = util.promisify(stream.pipeline);

@Resolver()
export class PetResolver {
  @Query(() => PetsObjectType)
  async getCategoryPets(
    @Arg("input", () => GetCategoryPetsInput)
    { category }: GetCategoryPetsInput,
    @Ctx() { prisma }: CtxType
  ): Promise<PetsObjectType> {
    const pets = await prisma.pet.findMany({
      where: {
        category: category as any,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        seller: true,
        reactions: true,
        location: true,
        comments: {
          include: {
            replies: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });
    return {
      count: pets.length,
      pets: pets ?? [],
    };
  }
  @Mutation(() => PetObjectType, { nullable: false })
  async deletePet(
    @Arg("input", () => DeletePetInputType)
    { id }: DeletePetInputType,
    @PubSub() pubsub: PubSubEngine,
    @Ctx() { prisma, request }: CtxType
  ): Promise<PetObjectType> {
    const jwt = request.headers.authorization?.split(" ")[1];
    if (!!!jwt)
      return {
        success: false,
      };
    const payload = await verifyJwt(jwt);
    if (!!!payload)
      return {
        success: false,
      };
    const user = await prisma.user.findFirst({ where: { id: payload.id } });
    if (!!!user)
      return {
        success: false,
      };
    try {
      const pet = await prisma.pet.findFirst({
        where: { id },
        include: { location: true },
      });

      if (!!!pet) return { success: false };

      if (pet.sellerId !== user.id) {
        return { success: false };
      }
      const urlParts = pet.image.split("/");
      const imageName: string = urlParts[urlParts.length - 1];
      const absoluteImagePath: string = path.join(
        storageDir,
        "pets",
        imageName
      );
      await fs.unlinkSync(absoluteImagePath);
      await prisma.pet.delete({
        where: { id: pet.id },
      });
      await pubsub.publish(Events.DELETE_PET, {
        petId: pet.id,
      });
      await pubsub.publish(Events.ON_CATEGORY_PET_DELETE, {
        category: pet.category,
      });
      return {
        success: true,
      };
    } catch (error) {
      console.log(error.message);
      return {
        success: false,
      };
    }
  }
  @Mutation(() => PetObjectType, { nullable: false })
  async update(
    @Arg("input", () => UpdatePetInputType)
    input: UpdatePetInputType,
    @Ctx() { prisma, request }: CtxType,
    @PubSub() pubsub: PubSubEngine
  ): Promise<PetObjectType> {
    const jwt = request.headers.authorization?.split(" ")[1];
    if (!!!jwt)
      return {
        success: false,
      };
    const payload = await verifyJwt(jwt);
    if (!!!payload)
      return {
        success: false,
      };
    const user = await prisma.user.findFirst({ where: { id: payload.id } });
    if (!!!user)
      return {
        success: false,
      };
    try {
      const pet = await prisma.pet.findFirst({
        where: { id: input.id },
        include: { location: true },
      });
      if (!!!pet) return { success: false };
      if (pet.sellerId !== user.id) {
        return { success: false };
      }
      let petImage: string = "";
      if (!!input.image) {
        const { filename, createReadStream } = await input.image;
        const fileName: string = `${pet.id}.${
          filename.split(".")[filename.split(".").length - 1]
        }`;
        petImage = __storageBaseURL__ + `/pets/${fileName}`;
        const rs = createReadStream();
        const ws = fs.createWriteStream(
          path.join(storageDir, "pets", fileName)
        );
        await pipeline(rs, ws);
      }

      if (!!input.location) {
        if (!!pet.location) {
          // update the one that exist on pet
          await prisma.location.update({
            where: { id: pet.location.id },
            data: {
              lat: input.location.lat,
              lon: input.location.lon,
              pet: {
                connect: { id: pet.id },
              },
            },
          });
        } else {
          // create one for that pet
          await prisma.location.create({
            data: {
              lat: input.location.lat,
              lon: input.location.lon,
              pet: {
                connect: { id: pet.id },
              },
            },
          });
        }
      } else {
        if (!!pet.location) {
          await prisma.location.update({
            where: {
              id: pet.location.id,
            },
            data: { lat: 0, lon: 0 },
          });
        }
      }
      await prisma.pet.update({
        where: { id: pet.id },
        data: {
          image: !!petImage ? petImage : pet.image,
          age: input.age,
          name: input.name,
          gender: input.gender,
          description: input.description,
          price: input.price,
        },
      });
      await pubsub.publish(Events.NEW_PET_UPDATE, {
        petId: pet.id,
      });

      await pubsub.publish(Events.ON_CATEGORY_PET_DELETE, {
        category: pet.category,
      });
      return {
        success: true,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
      };
    }
  }

  @Mutation(() => PetObjectType, { nullable: false })
  async add(
    @PubSub() pubsub: PubSubEngine,
    @Arg("input", () => NewPetInputType)
    {
      image,
      age,
      category,
      description,
      gender,
      name,
      price,
      location: loc,
    }: NewPetInputType,
    @Ctx() { prisma, request }: CtxType
  ): Promise<PetObjectType> {
    const jwt = request.headers.authorization?.split(" ")[1];
    if (!!!jwt)
      return {
        success: false,
      };
    const payload = await verifyJwt(jwt);
    if (!!!payload)
      return {
        success: false,
      };
    const user = await prisma.user.findFirst({ where: { id: payload.id } });
    if (!!!user)
      return {
        success: false,
      };
    try {
      const _pet = await prisma.pet.create({
        data: {
          category: category as any,
          description: description,
          gender: gender as any,
          name,
          price,
          age,
          seller: {
            connect: { id: user.id },
          },
          image: "",
          location: {
            create: {
              lat: loc?.lat ?? 0,
              lon: loc?.lon ?? 0,
            },
          },
        },
      });
      const { filename, createReadStream } = await image;
      const fileName: string = `${_pet.id}.${
        filename.split(".")[filename.split(".").length - 1]
      }`;
      const petImage: string = __storageBaseURL__ + `/pets/${fileName}`;
      const rs = createReadStream();
      const ws = fs.createWriteStream(path.join(storageDir, "pets", fileName));
      await pipeline(rs, ws);
      const pet = await prisma.pet.update({
        where: { id: _pet.id },
        data: {
          image: petImage,
        },
      });
      await pubsub.publish(Events.ON_NEW_CATEGORY_PET, {
        category: pet.category,
      });
      return {
        success: true,
        pet: {
          age: pet.age,
          category: pet.category,
          createdAt: pet.createdAt,
          description: pet.description,
          gender: pet.gender,
          id: pet.id,
          image: pet.image,
          name: pet.name,
          price: pet.price,
          sold: pet.sold,
          updatedAt: pet.updatedAt,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
      };
    }
  }

  @Query(() => PetObjectType, { nullable: true })
  async getPetById(
    @Arg("input", () => GetPetByIdInput) { id }: GetPetByIdInput,
    @Ctx() { prisma }: CtxType
  ): Promise<PetObjectType> {
    const pet = await prisma.pet.findFirst({
      where: {
        id,
      },

      include: {
        location: true,
        seller: true,
        reactions: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "asc",
          },
        },
        comments: {
          orderBy: { createdAt: "asc" },
          include: {
            user: true,
            reactions: {
              orderBy: { createdAt: "asc" },
              include: {
                user: true,
              },
            },
            replies: {
              orderBy: { createdAt: "asc" },
              include: { user: true, reactions: true },
            },
          },
        },
      },
    });

    if (!!!pet) {
      return {
        success: false,
      };
    }

    return {
      success: true,
      pet: {
        age: pet.age,
        category: pet.category,
        createdAt: pet.createdAt,
        description: pet.description,
        gender: pet.gender,
        id: pet.id,
        image: pet.image,
        name: pet.name,
        price: pet.price,
        sold: pet.sold,
        updatedAt: pet.updatedAt,
        location: {
          id: pet.location.id,
          lat: pet.location.lat,
          lon: pet.location.lon,
          createAt: pet.location.createdAt,
          updateAt: pet.location.updatedAt,
        },
        seller: {
          ...pet.seller,
          avatar: pet.seller.avatar || "",
        },
        reactions: pet.reactions,
        comments: pet.comments,
      },
    };
  }

  @Mutation(() => PetObjectType, { nullable: false })
  async markAsSold(
    @Arg("input", () => MarkAsSoldInput) { id }: MarkAsSoldInput,
    @Ctx() { prisma, request }: CtxType,
    @PubSub() pubsub: PubSubEngine
  ): Promise<PetObjectType> {
    const jwt = request.headers.authorization?.split(" ")[1];
    if (!!!jwt)
      return {
        success: false,
      };
    const payload = await verifyJwt(jwt);
    if (!!!payload)
      return {
        success: false,
      };
    const user = await prisma.user.findFirst({ where: { id: payload.id } });
    if (!!!user)
      return {
        success: false,
      };
    try {
      const pet = await prisma.pet.findFirst({ where: { id } });
      if (!!!pet) {
        return { success: false };
      }
      if (pet.sellerId !== user.id) {
        return { success: false };
      }
      await prisma.pet.update({
        where: {
          id: pet.id,
        },
        data: {
          sold: true,
        },
      });
      await pubsub.publish(Events.NEW_PET_UPDATE, {
        petId: pet.id,
      });
      await pubsub.publish(Events.ON_CATEGORY_PET_UPDATE, {
        category: pet.category,
      });
    } catch (error) {
      console.log({ error });
      return {
        success: false,
      };
    }
    return {
      success: true,
    };
  }

  @Subscription(() => PetInteractionType, {
    topics: [
      Events.NEW_COMMENT,
      Events.NEW_COMMENT_REPLY,
      Events.NEW_REACTION_TO_PET,
      Events.NEW_REACTION_TO_COMMENT,
      Events.NEW_PET_UPDATE,
      Events.DELETE_PET,
    ],
    nullable: false,
  })
  async petInteraction(@Root() { petId }: { petId: string }): Promise<{
    petId: string;
  }> {
    return {
      petId,
    };
  }

  @Subscription(() => CategoryPetSubscription, {
    topics: [
      Events.ON_NEW_CATEGORY_PET,
      Events.ON_CATEGORY_PET_DELETE,
      Events.ON_CATEGORY_PET_UPDATE,
      Events.ON_REACT_TO_CATEGORY_PET_UPDATE,
      Events.ON_COMMENT_TO_CATEGORY_PET_UPDATE,
    ],
    nullable: false,
  })
  async categoryPetSubscription(
    @Root() { category }: { category: string }
  ): Promise<CategoryPetSubscription> {
    return {
      category,
    };
  }
}
