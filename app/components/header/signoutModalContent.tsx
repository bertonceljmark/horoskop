import {
  Button,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { signOut } from "next-auth/react";

const SignoutModalContent = () => {
  return (
    <>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Sign out</ModalHeader>
            <ModalBody>Are you sure you want to sign out?</ModalBody>
            <ModalFooter>
              <Button onPress={onClose} color="secondary" variant="flat">
                Cancel
              </Button>
              <Button onPress={() => signOut()} color="secondary">
                <div className="flex align-items-center gap-2">
                  <span>Sign out</span>
                </div>
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </>
  );
};

export default SignoutModalContent;
