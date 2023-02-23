import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { CtxType } from "../../types";
import { RegisterInput } from "./inputs/inputTypes";
import { MeObjectType, RegisterObjectType } from "./objects/objectTypes";
import argon2 from "argon2";
import { isValidEmail, isValidPassword } from "@crispengari/regex-validator";
import { signJwt, storeCookie, verifyJwt } from "../../utils";
import { User } from "@prisma/client";
@Resolver()
export class UserResolver {
  @Query(() => MeObjectType, { nullable: true })
  async me(
    @Ctx() { prisma, request }: CtxType
  ): Promise<MeObjectType | undefined> {
    const jwt = request.headers.authorization?.split(" ")[1];

    console.log(jwt);
    if (!!!jwt) return undefined;

    const payload = await verifyJwt(jwt);
    if (!!!payload) return undefined;
    const user = await prisma.user.findFirst({ where: { id: payload.id } });
    if (!!!user) return undefined;
    return {
      ...user,
    };
  }

  @Mutation(() => RegisterObjectType)
  async register(
    @Arg("input", () => RegisterInput, { nullable: false })
    { confirmPassword, email, password, isWeb }: RegisterInput,
    @Ctx() { prisma, reply }: CtxType
  ): Promise<RegisterObjectType | undefined> {
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
    if (isWeb) {
      storeCookie(reply, jwt);
    }
    return {
      jwt: isWeb ? "" : jwt,
    };
  }
}
