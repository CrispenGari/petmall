import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  Root,
  Subscription,
} from "type-graphql";
import {
  GetCategoryPetsInput,
  GetPetByIdInput,
  MarkAsSoldInput,
  NewPetInputType,
} from "./inputs/inputTypes";
import stream from "stream";
import util from "util";
import fs from "fs";
import path from "path";
import { Events, __storageBaseURL__ } from "../../constants";
import { CtxType } from "../../types";
import { verifyJwt } from "../../utils";
import {
  PetInteractionType,
  PetObjectType,
  PetsObjectType,
} from "./objects/objectTypes";
export const storageDir = path.join(
  __dirname.replace("dist\\resolvers\\pet", ""),
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
  async add(
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
        },
        comments: {
          include: {
            user: true,
            reactions: true,
            replies: {
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
        },
        reactions: pet.reactions,
        comments: pet.comments,
      },
    };
  }

  @Mutation(() => PetObjectType, { nullable: false })
  async markAsSold(
    @Arg("input", () => MarkAsSoldInput) { id }: MarkAsSoldInput,
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
      await prisma.pet.update({
        where: {
          id: id as string,
        },
        data: {
          sold: true,
        },
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
}
