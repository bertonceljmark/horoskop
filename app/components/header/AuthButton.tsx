import { Avatar, Button, NavbarItem, useDisclosure } from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import AuthModal from "./authModal";
import { useEffect, useState } from "react";

const AuthButton = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalMode, setModalMode] = useState<
    "login" | "signup" | "edit" | "signout" | undefined
  >(undefined);

  const { data: session } = useSession();

  const handleButtonPress = (mode: "login" | "signup" | "edit" | "signout") => {
    return () => {
      setModalMode(mode);
      onOpen();
    };
  };

  useEffect(() => {
    if (!isOpen) {
      setModalMode(undefined);
    }
  }, [isOpen]);

  return (
    <>
      {session ? (
        <NavbarItem>
          <div className="flex flex-row items-center gap-3">
            <Button
              color="primary"
              onClick={handleButtonPress("signout")}
              variant="flat"
            >
              Sign Out
            </Button>
            <Avatar
              color="primary"
              size="md"
              name={session?.user?.name?.charAt(0).toUpperCase() || "A"}
              onClick={handleButtonPress("edit")}
            />
          </div>
        </NavbarItem>
      ) : (
        <>
          <NavbarItem className="flex">
            <Button
              onClick={handleButtonPress("login")}
              variant="flat"
              color="secondary"
            >
              Login
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button
              onClick={handleButtonPress("signup")}
              color="primary"
              variant="flat"
            >
              Sign Up
            </Button>
          </NavbarItem>
        </>
      )}
      <AuthModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        modalMode={modalMode}
      />
    </>
  );
};

export default AuthButton;
