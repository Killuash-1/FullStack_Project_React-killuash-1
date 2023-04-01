import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import {
  iYupContactForm,
  iYupContactFormErrors,
} from "../../interfaces/register";
import InputMask from "react-input-mask";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ContactContext } from "../../context/ContactsRequests";
import { useContext, useRef } from "react";
import { ModalContextManual } from "../../context/ModalContext";
import { iContactRegisterPatch } from "../../interfaces/patch/patch";
import { ContactPostformSchema } from "../../schema/Contacts";

function ModalUser() {
  const { isPost, postClose } = useContext(ModalContextManual);
  const { postContact } = useContext(ContactContext);

  const initialRefPost = useRef(null);
  const finalRefPost = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<iYupContactForm, iYupContactFormErrors>({
    resolver: yupResolver(ContactPostformSchema),
  });

  const submit = async (data: iContactRegisterPatch) => {
    await postContact(data);

    reset();

    postClose();
    return;
  };
  return (
    <>
      <Modal
        initialFocusRef={initialRefPost}
        finalFocusRef={finalRefPost}
        isOpen={isPost}
        onClose={postClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicione seu Contato</ModalHeader>
          <ModalCloseButton />
          <Box as="form" onSubmit={handleSubmit(submit)}>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Nome Completo</FormLabel>
                <Input
                  {...register("name")}
                  id="name"
                  placeholder="Digite seu nome"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  {...register("email")}
                  id="email"
                  placeholder="Digite seu email"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Telefone</FormLabel>
                <Input
                  as={InputMask}
                  {...register("telephone")}
                  id="telephone"
                  placeholder="Digite seu Numero"
                  mask={"(99)99999-9999"}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button mr={3} type="submit" isDisabled={!isValid}>
                Adicionar
              </Button>
              <Button onClick={postClose}>Sair</Button>
            </ModalFooter>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalUser;
