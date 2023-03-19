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
import { CtxType } from "../../types";
import {
  GetUserByIdInput,
  LoginInput,
  RegisterInput,
  UpdateAvatarInputType,
} from "./inputs/inputTypes";
import { LoginObjectType, RegisterObjectType } from "./objects/objectTypes";
import argon2 from "argon2";
import { isValidEmail, isValidPassword } from "@crispengari/regex-validator";
import { modifyName, signJwt, verifyJwt } from "../../utils";
import client from "@prisma/client";
import path from "path";
import util from "util";
import stream from "stream";
import fs from "fs";
import { Events, __storageBaseURL__ } from "../../constants";
import { UserType } from "../common/objects/UserType";
const storageDir = path.join(
  __dirname.replace("dist\\resolvers\\user", ""),
  "storage"
);
const pipeline = util.promisify(stream.pipeline);
@Resolver()
export class UserResolver {
  @Subscription(() => Boolean, {
    topics: [Events.ON_USER_STATE_CHANGED, Events.ON_USER_AUTH_STATE_CHANGED],
    nullable: true,
  })
  async onUserStateChange(
    @Root() { userId }: { userId: string },
    @Arg("userId", () => String) id: string
  ): Promise<Boolean> {
    return id === userId;
  }
  @Mutation(() => Boolean)
  async updateAvatar(
    @Ctx() { prisma, request }: CtxType,
    @PubSub() pubsub: PubSubEngine,
    @Arg("input", () => UpdateAvatarInputType) { avatar }: UpdateAvatarInputType
  ): Promise<Boolean> {
    // console.log({ prisma });
    const jwt = request.headers.authorization?.split(" ")[1];
    if (!!!jwt) return false;
    const payload = await verifyJwt(jwt);
    if (!!!payload) return false;
    const user = await prisma.user.findFirst({ where: { id: payload.id } });
    if (!!!user) return false;
    try {
      const { filename, createReadStream } = await avatar;
      const fileName: string = `${user.id}.${
        filename.split(".")[filename.split(".").length - 1]
      }`;
      const avatarImage: string = __storageBaseURL__ + `/avatars/${fileName}`;
      const rs = createReadStream();
      const ws = fs.createWriteStream(
        path.join(storageDir, "avatars", fileName)
      );
      await pipeline(rs, ws);
      await prisma.user.update({
        where: { id: user.id },
        data: {
          avatar: avatarImage,
        },
      });
      await pubsub.publish(Events.ON_USER_STATE_CHANGED, {
        userId: user.id,
      });
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;
  }
  @Mutation(() => Boolean)
  async updateUserInfo(
    @Ctx() { prisma, request }: CtxType,
    @PubSub() pubsub: PubSubEngine
  ): Promise<Boolean> {
    const jwt = request.headers.authorization?.split(" ")[1];
    if (!!!jwt) return false;
    const payload = await verifyJwt(jwt);
    if (!!!payload) return false;
    const user = await prisma.user.findFirst({ where: { id: payload.id } });
    if (!!!user) return false;

    return true;
  }

  @Query(() => UserType, { nullable: false })
  async user(
    @Arg("input", () => GetUserByIdInput) { id }: GetUserByIdInput,
    @Ctx() { prisma }: CtxType
  ): Promise<UserType | undefined> {
    const user = await prisma.user.findFirst({
      where: { id },
      include: {
        pets: true,
      },
    });
    if (!!!user) return undefined;
    return user;
  }

  @Query(() => UserType, { nullable: true })
  async me(@Ctx() { prisma, request }: CtxType): Promise<UserType | undefined> {
    const jwt = request.headers.authorization?.split(" ")[1];
    if (!!!jwt) return undefined;
    const payload = await verifyJwt(jwt);
    if (!!!payload) return undefined;
    const user = await prisma.user.findFirst({ where: { id: payload.id } });
    if (!!!user) return undefined;
    return user;
  }

  @Mutation(() => Boolean)
  async logout(
    @Ctx() { request, prisma }: CtxType,
    @PubSub() pubsub: PubSubEngine
  ): Promise<Boolean> {
    const jwt = request.headers.authorization?.split(" ")[1];
    if (!!!jwt) return false;
    const payload = await verifyJwt(jwt);
    if (!!!payload) return false;

    await prisma.user.update({
      where: { id: payload.id },
      data: { isLoggedIn: false },
    });
    await pubsub.publish(Events.ON_USER_AUTH_STATE_CHANGED, {
      userId: payload.id,
    });
    return true;
  }

  @Mutation(() => LoginObjectType)
  async login(
    @PubSub() pubsub: PubSubEngine,
    @Arg("input", () => LoginInput, { nullable: false })
    { email, password }: LoginInput,
    @Ctx() { prisma }: CtxType
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
    await prisma.user.update({
      where: { id: user.id },
      data: { isLoggedIn: true },
    });
    await pubsub.publish(Events.ON_USER_AUTH_STATE_CHANGED, {
      userId: user.id,
    });
    return {
      jwt,
      me: { ...user, avatar: user.avatar || "" },
    };
  }
  @Mutation(() => RegisterObjectType)
  async register(
    @Arg("input", () => RegisterInput, { nullable: false })
    { confirmPassword, email, password, firstName, lastName }: RegisterInput,
    @PubSub() pubsub: PubSubEngine,
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
    if (firstName.trim().length < 3) {
      return {
        error: {
          field: "firstName",
          message: "first name must be at least 3 characters long.",
        },
      };
    }
    if (lastName.trim().length < 3) {
      return {
        error: {
          field: "lastName",
          message: "last name must be at least 3 characters long.",
        },
      };
    }

    const hash = await argon2.hash(password.trim());
    const user = await prisma.user.create({
      data: {
        email: email.trim(),
        password: hash,
        firstName: modifyName(firstName.trim()),
        lastName: modifyName(lastName.trim()),
      },
    });

    const jwt: string = await signJwt(user);
    await prisma.user.update({
      where: { id: user.id },
      data: { isLoggedIn: true },
    });
    await pubsub.publish(Events.ON_USER_AUTH_STATE_CHANGED, {
      userId: user.id,
    });
    return {
      jwt,
      me: {
        ...user,
        avatar: user.avatar || "",
      },
    };
  }
}
