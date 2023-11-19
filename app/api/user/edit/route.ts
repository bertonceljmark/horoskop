import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
  validateEmail,
  validateName,
  validatePassword,
  validatePhone,
  validateSignId,
} from "../userValidators";
import { getDbUser, hashPassword } from "../userHelper";

export async function GET(request: NextRequest) {
  try {
    const urlParams = request.nextUrl.searchParams;

    const errors = await validateUser(urlParams);

    if (errors.length > 0) {
      return NextResponse.json(
        { errors, user: null, success: false },
        { status: 200 }
      );
    }

    const encryptedPassword = await hashPassword(
      urlParams.get("password") as string
    );

    const user = await getDbUser(urlParams.get("email") as string);

    if (!user) {
      return NextResponse.json(
        {
          errors: [{ key: "email", value: "Email does not exist" }],
          success: false,
          user: null,
        },
        { status: 200 }
      );
    }
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: urlParams.get("name") as string,
        email: urlParams.get("email") as string,
        password: encryptedPassword,
        phone: urlParams.get("phone") as string,
        signId: urlParams.get("signId") as string,
      },
    });

    return NextResponse.json(
      { user: updatedUser, errors, success: true },
      { status: 200 }
    );
  } catch (serverError) {
    return NextResponse.json(
      { serverError, user: null, errors: [], success: false },
      { status: 400 }
    );
  }
}

const validateUser = async (params: URLSearchParams) => {
  const errors = [
    ...validateName(params.get("name")),
    ...validatePhone(params.get("phone")),
    ...validatePassword(params.get("password"), params.get("confirmPassword")),
  ];

  const signErrors = await validateSignId(params.get("signId"));

  errors.push(...signErrors);

  return errors;
};
