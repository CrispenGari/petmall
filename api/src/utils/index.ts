import { User } from "@prisma/client";
import { FastifyReply } from "fastify";
import jwt from "jsonwebtoken";
import { __cookieName__ } from "../constants";
import nodemailer from "nodemailer";
import { unlink } from "fs/promises";

export const sendEmail = async (
  email: string,
  html: string,
  subject: string
) => {
  const testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
  const info = await transporter.sendMail({
    from: '"Admin" <petmall@petmall.com>',
    to: email,
    subject,
    html,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

export const modifyName = (name: string): string => {
  return name
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};

export const storeCookie = (reply: FastifyReply, value: string) => {
  reply.setCookie(__cookieName__, value, {
    httpOnly: true,
    sameSite: "lax",
  });
};
export const signJwt = async ({ id, email }: User): Promise<string> => {
  return await jwt.sign(
    {
      id,
      email,
    },
    process.env.JWT_TOKEN_SCRETE
  );
};

export const verifyJwt = async (token: string) => {
  return jwt.verify(token, process.env.JWT_TOKEN_SCRETE) as Partial<User>;
};

export const deleteFiles = async (
  paths: Array<string>
): Promise<{ success: boolean }> => {
  try {
    const promises = paths.map((file) => unlink(file));
    await Promise.all(promises);
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false };
  }
};
