import { useDisclosure } from "@chakra-ui/react";
import { createContext, useState } from "react";
import { iReactNode } from "../interfaces/context";
import { iModalContext, iModalContextPatch } from "../interfaces/modal";

export const ModalContextManual = createContext({} as iModalContext);

const ModalHandeling = ({ children }: iReactNode) => {
  const [patch, setPatch] = useState<iModalContextPatch>();
  const {isOpen: isPost, onOpen: onPost, onClose: postClose } =useDisclosure()
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <ModalContextManual.Provider
      value={{ isOpen, onOpen, onClose, setPatch, patch, isPost, onPost, postClose,  }}
    >
      {children}
    </ModalContextManual.Provider>
  );
};
export default ModalHandeling;
