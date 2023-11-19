import prisma from "@/lib/prisma";
import { getDbSign, getDbUser } from "./userHelper";

export const validateName = (name: string | null) => {
  //name does not exist
  if (!name) return [{ key: "name", value: "Name not set" }];

  //name is too short
  if (name.length < 2) return [{ key: "name", value: "Name too short" }];

  //name is too long
  if (name.length > 50) return [{ key: "name", value: "Name too long" }];

  return [];
};

export const validateEmail = async (email: string | null) => {
  //email does not exist
  if (!email) return [{ key: "email", value: "Email not set" }];

  //email not in correct format
  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    return [{ key: "email", value: "Email not valid" }];
  }

  //email already exists
  const dbUser = await getDbUser(email);

  if (dbUser) {
    return [{ key: "email", value: "Email already exists" }];
  }

  return [];
};

export const validatePhone = (phone: string | null) => {
  console.log(phone);
  //phone does not exist
  if (!phone) return [{ key: "phone", value: "Phone not set" }];

  //phone not in correct format (with country code)
  if (!phone.match(/^\+[1-9]\d{1,14}$/)) {
    return [{ key: "phone", value: "Phone not valid" }];
  }

  return [];
};

export const validatePassword = (
  password: string | null,
  confirmPassword: string | null
) => {
  //password does not exist
  if (!password) return [{ key: "password", value: "Password not set" }];

  //password is too short
  if (password.length < 8)
    return [{ key: "password", value: "Password too short" }];

  //password is too long
  if (password.length > 50)
    return [{ key: "password", value: "Password too long" }];

  //password and confirmPassword do not match
  if (password !== confirmPassword) {
    return [{ key: "confirmPassword", value: "Passwords do not match" }];
  }

  return [];
};

export const validateSignId = async (signId: string | null) => {
  //signId does not exist
  if (!signId) return [{ key: "sign", value: "Sign not set" }];

  const dbSign = await getDbSign(signId);

  //signId is not in the list of signs
  if (!dbSign) {
    return [{ key: "sign", value: "Sign not valid" }];
  }

  return [];
};
