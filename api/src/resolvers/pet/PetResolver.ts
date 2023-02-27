import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { GetCategoryPetsInput, NewPetInputType } from "./inputs/inputTypes";
import stream from "stream";
import util from "util";
import fs from "fs";
import path from "path";
import { __storageBaseURL__ } from "../../constants";
import { CtxType } from "../../types";
import { verifyJwt } from "../../utils";
import { PetObjectType } from "./objects/objectTypes";
export const storageDir = path.join(
  __dirname.replace("dist\\resolvers\\pet", ""),
  "storage"
);
const pipeline = util.promisify(stream.pipeline);

@Resolver()
export class PetResolver {
  @Query(() => [PetObjectType])
  async getCategoryPets(
    @Arg("input", () => GetCategoryPetsInput)
    { category }: GetCategoryPetsInput,
    @Ctx() { prisma }: CtxType
  ): Promise<Array<PetObjectType>> {
    const pets = await prisma.pet.findMany({
      where: {
        category: category as any,
      },
    });
    return pets;
  }

  @Mutation(() => PetObjectType, { nullable: true })
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
  ): Promise<PetObjectType | undefined> {
    const jwt = request.headers.authorization?.split(" ")[1];
    if (!!!jwt) return undefined;
    const payload = await verifyJwt(jwt);
    if (!!!payload) return undefined;
    const user = await prisma.user.findFirst({ where: { id: payload.id } });
    if (!!!user) return undefined;
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
      };
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }
}
