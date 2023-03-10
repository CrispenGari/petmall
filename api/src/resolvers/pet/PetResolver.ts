import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import {
  CommentToPetInput,
  GetCategoryPetsInput,
  GetPetByIdInput,
  MarkAsSoldInput,
  NewPetInputType,
  ReactToPetInput,
} from "./inputs/inputTypes";
import stream from "stream";
import util from "util";
import fs from "fs";
import path from "path";
import { __storageBaseURL__ } from "../../constants";
import { CtxType } from "../../types";
import { verifyJwt } from "../../utils";
import { PetObjectType, PetsObjectType } from "./objects/objectTypes";
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

  @Mutation(() => PetObjectType, { nullable: false })
  async reactToPet(
    @Arg("input", () => ReactToPetInput) { id, reaction }: ReactToPetInput,
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
    const pet = await prisma.pet.findFirst({
      where: {
        id: id as string,
      },
      include: {
        reactions: true,
      },
    });

    if (!!!pet) {
      return {
        success: false,
      };
    }
    // if you don't want to react to your own pet?
    // if (pet.sellerId === user.id) {
    //   return { success: false };
    // }
    const _reaction = pet.reactions.find(
      (reaction) => reaction.userId === user.id
    );
    if (!!_reaction) {
      // you liked the pet already
      await prisma.reaction.delete({
        where: {
          id: _reaction.id,
        },
      });
      return {
        success: true,
      };
    }
    try {
      await prisma.reaction.create({
        data: {
          reaction,
          user: {
            connect: {
              id: user.id,
            },
          },
          pet: {
            connect: {
              id: pet.id,
            },
          },
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

  @Mutation(() => PetObjectType, { nullable: false })
  async commentToPet(
    @Arg("input", () => CommentToPetInput) { id, comment }: CommentToPetInput,
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
    const pet = await prisma.pet.findFirst({
      where: {
        id: id as string,
      },
      include: {
        reactions: true,
      },
    });

    if (!!!pet) {
      return {
        success: false,
      };
    }
    try {
      const cmt = await prisma.comment.create({
        data: {
          comment: comment,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });
      await prisma.pet.update({
        where: { id },
        data: {
          comments: {
            connect: { id: cmt.id },
          },
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
}
