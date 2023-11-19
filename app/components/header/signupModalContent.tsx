import useGetInitSign from "@/app/hooks/useGetInitSign";
import { IError, StarValueType } from "@/app/interfaces/globalInterfaces";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { userCreator } from "@/app/signup/userCreationService";
import FormInputRow from "@/app/signup/inputRow";
import SignSelect from "../SignSelect";
import {
  Button,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

const SignupModalContent = ({ isOpen }: { isOpen: boolean }) => {
  const initSign = useGetInitSign() as StarValueType;
  console.log("herdsfgsde");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    signId: initSign,
  });

  const [errors, setErrors] = useState<IError[]>([]);

  useEffect(() => {
    setErrors([]);
  }, [isOpen]);

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
    <>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Sign up</ModalHeader>
            <ModalBody>
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
              </form>
            </ModalBody>
            <ModalFooter>
              <Button onPress={onClose} color="secondary" variant="flat">
                Cancel
              </Button>
              <Button onPress={handleSubmit} color="secondary">
                Sign up
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </>
  );
};

export default SignupModalContent;
