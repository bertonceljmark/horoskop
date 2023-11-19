import { NextRequest, NextResponse } from "next/server";
import {
  validateEmail,
  validateName,
  validatePassword,
  validatePhone,
  validateSignId,
} from "../userValidators";
import { hashPassword } from "../userHelper";
import { PrismaAdapter } from "@/lib/PrismaAdapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const urlParams = request.nextUrl.searchParams;

    const errors = await validateUserCreation(urlParams);

    if (errors.length > 0) {
      return NextResponse.json(
        { errors, user: null, success: false },
        { status: 200 }
      );
    }

    const encryptedPassword = await hashPassword(
      urlParams.get("password") as string
    );

    const user = await prisma.user.create({
      data: {
        name: urlParams.get("name") as string,
        email: urlParams.get("email") as string,
        password: encryptedPassword,
        phone: urlParams.get("phone") as string,
        signId: urlParams.get("signId") as string,
      },
    });

    return NextResponse.json({ user, errors, success: true }, { status: 200 });
  } catch (serverError) {
    return NextResponse.json(
      { serverError, user: null, errors: [], success: false },
      { status: 400 }
    );
  }
}

const validateUserCreation = async (params: URLSearchParams) => {
  const errors = [
    ...validateName(params.get("name")),
    ...validatePhone(params.get("phone")),
    ...validatePassword(params.get("password"), params.get("confirmPassword")),
  ];

  const emailErrors = await validateEmail(params.get("email"));
  const signErrors = await validateSignId(params.get("signId"));

  errors.push(...emailErrors, ...signErrors);

  return errors;
};
