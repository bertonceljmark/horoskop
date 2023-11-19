import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 10);
};

export const getDbSign = async (signId: string) => {
  return await prisma.starSign.findUnique({
    where: {
      signId,
    },
  });
};

export const getDbUser = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};
