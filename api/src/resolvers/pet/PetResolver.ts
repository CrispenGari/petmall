import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import {
  GetCategoryPetsInput,
  GetPetByIdInput,
  NewPetInputType,
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
    console.log({ image });
    if (!!!jwt)
      return {
        success: false,
      };
    console.log({ jwt });
    const payload = await verifyJwt(jwt);
    console.log({ payload });
    if (!!!payload)
      return {
        success: false,
      };
    const user = await prisma.user.findFirst({ where: { id: payload.id } });
    if (!!!user)
      return {
        success: false,
      };

    console.log({ user });
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
              ...loc,
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
        id: id as any,
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
          include: { user: true },
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
          city: pet.location.city as any,
          country: pet.location.country as any,
          isoCountryCode: pet.location.isoCountryCode as any,
          district: pet.location.district as any,
          name: pet.location.name as any,
          createAt: pet.location.createdAt,
          updateAt: pet.location.updatedAt,
          subregion: pet.location.subregion as any,
          streetNumber: pet.location.streetNumber as any,
          street: pet.location.street as any,
          region: pet.location.region as any,
          timezone: pet.location.timezone as any,
          postalCode: pet.location.postalCode as any,
        },
        seller: {
          ...pet.seller,
        },
        reactions: {
          ...pet.reactions,
        },
        comments: {
          ...pet.comments,
        },
      },
    };
  }
}
