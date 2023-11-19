import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useMemo, useState } from "react";
import LoginModalBody from "./loginModalContent";
import LoginModalContent from "./loginModalContent";
import SignupModalContent from "./signupModalContent";
import SignoutModalContent from "./signoutModalContent";
import UserEditModalContent from "./userEditModal";

interface IProps {
  isOpen: boolean;
  onOpenChange: () => void;
  modalMode?: "login" | "signup" | "edit" | "signout";
}

const AuthModal = ({ isOpen, onOpenChange, modalMode }: IProps) => {
  const modal = useMemo(() => {
    switch (modalMode) {
      case "login":
        return <LoginModalContent isOpen={isOpen} />;
      case "signout":
        return <SignoutModalContent />;
      case "signup":
        return <SignupModalContent isOpen={isOpen} />;
      case "edit":
        return <UserEditModalContent isOpen={isOpen} />;
      default:
        return <LoginModalContent isOpen={isOpen} />;
    }
  }, [modalMode]);
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      {modal}
    </Modal>
  );
};

export default AuthModal;
