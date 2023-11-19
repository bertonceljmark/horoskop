import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@/lib/PrismaAdapter";

const prisma = new PrismaClient();

const isSamePassword = (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword).then((isValid) => {
    return isValid;
  });
};

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "E-mail",
          type: "email",
          placeholder: "john.smith@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const { email, password } = credentials;

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) return null;

        const isValid = await isSamePassword(password, user.password);

        if (user && isValid) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  // TODO: change session to database strategy, so we can track them
  // https://nneko.branche.online/next-auth-credentials-provider-with-the-database-session-strategy/
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
