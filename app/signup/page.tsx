"use client";
import { useState } from "react";
import { Button } from "@nextui-org/react";
import { userCreator } from "./userCreationService";
import { IError, StarValueType } from "../interfaces/globalInterfaces";
import FormInputRow from "./inputRow";
import { signIn } from "next-auth/react";
import SignSelect from "../components/SignSelect";
import useGetInitSign from "../hooks/useGetInitSign";

const Signup = () => {
  const initSign = useGetInitSign() as StarValueType;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    signId: initSign,
  });

  const [errors, setErrors] = useState<IError[]>([]);

  const handleChange = (field: string) => {
    return (value: string) => {
      //clears error on input
      if (getSpecificError(field)) {
        setErrors(errors.filter((error) => error.key !== field));
      }

      setForm({
        ...form,
        [field]: value,
      });
    };
  };

  const handleSignChange = (value: StarValueType) => {
    setForm({
      ...form,
      signId: value,
    });
  };

  const handleLogin = async () => {
    //TODO: error handling
    await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });
  };

  const handleSubmit = async () => {
    const response = await userCreator.createUser(form);

    if (response.success) {
      await handleLogin();
    }

    setErrors(response.errors);
  };

  const getSpecificError = (field: string) => {
    return errors.find((error) => error.key === field)?.value;
  };

  return (
    <form className="w-full max-w-4xl">
      <FormInputRow
        field="name"
        form={form}
        handleChange={handleChange}
        getSpecificError={getSpecificError}
        placeholder="John Doe"
        type="text"
        label="Name"
      />
      <FormInputRow
        field="email"
        form={form}
        handleChange={handleChange}
        getSpecificError={getSpecificError}
        placeholder="john.doe@gmail.com"
        type="email"
        label="E-mail"
      />
      <FormInputRow
        field="phone"
        form={form}
        handleChange={handleChange}
        getSpecificError={getSpecificError}
        placeholder="+386 00 000 000"
        type="text"
        label="Phone"
      />
      <FormInputRow
        field="password"
        form={form}
        handleChange={handleChange}
        getSpecificError={getSpecificError}
        placeholder="**********"
        type="password"
        label="Password"
      />
      <FormInputRow
        field="confirmPassword"
        form={form}
        handleChange={handleChange}
        getSpecificError={getSpecificError}
        placeholder="**********"
        type="password"
        label="Confirm password"
      />
      <div className="my-2 w-full">
        <SignSelect
          sign={form.signId}
          handleChange={handleSignChange}
          error={getSpecificError("sign")}
        />
      </div>
      <Button
        onClick={handleSubmit}
        className="w-full"
        color="primary"
        variant="flat"
      >
        Sign up
      </Button>
    </form>
  );
};

export default Signup;
