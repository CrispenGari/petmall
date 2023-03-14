import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { CtxType } from "../../types";
import {
  GetUserByIdInput,
  LoginInput,
  RegisterInput,
} from "./inputs/inputTypes";
import {
  LoginObjectType,
  MeObjectType,
  RegisterObjectType,
  UserObjectType,
} from "./objects/objectTypes";
import argon2 from "argon2";
import { isValidEmail, isValidPassword } from "@crispengari/regex-validator";
import { signJwt, storeCookie, verifyJwt } from "../../utils";
@Resolver()
export class UserResolver {
  @Query(() => UserObjectType, { nullable: false })
  async user(
    @Arg("input", () => GetUserByIdInput) { id }: GetUserByIdInput,
    @Ctx() { prisma }: CtxType
  ): Promise<UserObjectType | undefined> {
    const user = await prisma.user.findFirst({
      where: { id },
      include: {
        pets: true,
      },
    });
    if (!!!user) return undefined;
    return {
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      avatar: user.avatar || undefined,
      email: user.email,
      id: user.id,
      pets: [...user.pets.map((pet) => pet)],
    };
  }

  @Query(() => MeObjectType, { nullable: true })
  async me(
    @Ctx() { prisma, request }: CtxType
  ): Promise<MeObjectType | undefined> {
    const jwt = request.headers.authorization?.split(" ")[1];
    if (!!!jwt) return undefined;
    const payload = await verifyJwt(jwt);
    if (!!!payload) return undefined;
    const user = await prisma.user.findFirst({ where: { id: payload.id } });
    if (!!!user) return undefined;
    return {
      ...user,
    };
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() {}: CtxType): Promise<Boolean> {
    return true;
  }

  @Mutation(() => LoginObjectType)
  async login(
    @Arg("input", () => LoginInput, { nullable: false })
    { email, password }: LoginInput,
    @Ctx() { prisma, reply }: CtxType
  ): Promise<LoginObjectType> {
    const user = await prisma.user.findFirst({
      where: { email: email.toLowerCase().trim() },
    });

    if (!!!user) {
      return {
        error: {
          field: "email",
          message: "The email address does not have an account.",
        },
      };
    }

    const correct = await argon2.verify(user.password, password.trim());

    if (!correct) {
      return {
        error: {
          field: "password",
          message: "Invalid account password.",
        },
      };
    }
    const jwt: string = await signJwt(user);
    return {
      jwt,
      me: user,
    };
  }
  @Mutation(() => RegisterObjectType)
  async register(
    @Arg("input", () => RegisterInput, { nullable: false })
    { confirmPassword, email, password }: RegisterInput,
    @Ctx() { prisma }: CtxType
  ): Promise<RegisterObjectType> {
    const _user = await prisma.user.findFirst({
      where: {
        email: email.trim().toLowerCase(),
      },
    });
    if (password.trim() !== confirmPassword.trim()) {
      return {
        error: {
          field: "confirm-password",
          message: "the two passwords must match.",
        },
      };
    }
    if (!!_user) {
      return {
        error: {
          field: "email",
          message: "the email address is taken by someone else.",
        },
      };
    }
    if (!isValidEmail(email.trim())) {
      return {
        error: {
          field: "email",
          message: "the email address is invalid.",
        },
      };
    }
    if (!isValidPassword(password.trim())) {
      return {
        error: {
          field: "password",
          message:
            "the password must contain minimum eight characters, at least one letter and one number.",
        },
      };
    }

    const hash = await argon2.hash(password.trim());
    const user = await prisma.user.create({
      data: {
        email: email.trim(),
        password: hash,
      },
    });
    const jwt: string = await signJwt(user);
    return {
      jwt,
      me: user,
    };
  }
}
