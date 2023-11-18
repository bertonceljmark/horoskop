import FormInputRow from "@/app/signup/inputRow";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Button,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@nextui-org/react";

const LoginModalContent = ({ isOpen }: { isOpen: boolean }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [isOpen]);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      // callbackUrl: "/",
      ...form,
    });

    console.log(res);
    if (res?.error) {
      setError(!!res.error);
    }

    if (res?.ok) {
      window.location.reload();
    }

    setLoading(false);
  };

  return (
    <>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Log in</ModalHeader>
            <ModalBody>
              {error && (
                <p className="text-red-500 text-center">
                  Invalid email or password
                </p>
              )}
              <form>
                <FormInputRow
                  field="email"
                  form={form}
                  handleChange={(field) => (value) => {
                    setForm({
                      ...form,
                      [field]: value,
                    });
                  }}
                  getSpecificError={() => ""}
                  placeholder="Email"
                  type="email"
                  label="Email"
                />
                <FormInputRow
                  field="password"
                  form={form}
                  handleChange={(field) => (value) => {
                    setForm({
                      ...form,
                      [field]: value,
                    });
                  }}
                  getSpecificError={() => ""}
                  placeholder="Password"
                  type="password"
                  label="Password"
                />
              </form>
            </ModalBody>
            <ModalFooter>
              <Button onPress={onClose} color="secondary" variant="flat">
                Cancel
              </Button>
              <Button onPress={handleLogin} color="secondary">
                <div className="flex align-items-center gap-2">
                  {loading && <Spinner size="sm" color="white" />}
                  <span>Login</span>
                </div>
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </>
  );
};

export default LoginModalContent;
