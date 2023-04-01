import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
} from "@chakra-ui/react";
import {
  iYupContactForm,
  iYupContactFormErrors,
} from "../../interfaces/register";
import InputMask from "react-input-mask";
import { useContext } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { ContactContext } from "../../context/ContactsRequests";
import { ContactformSchema } from "../../schema/Contacts";
import { ModalContextManual } from "../../context/ModalContext";
import { iContactRegisterPatch } from "../../interfaces/patch/patch";

function ModalContact() {
  const { isOpen, onClose, patch } = useContext(ModalContextManual);
  const { updateContact } = useContext(ContactContext);

  const {
    handleSubmit,
    reset,
    control,
    formState: {isValid },
  } = useForm<iYupContactForm, iYupContactFormErrors>({
    resolver: yupResolver(ContactformSchema),
  });

  const submit = async (data: iContactRegisterPatch) => {
    await updateContact(data, patch);
    onClose();
    reset();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edite seu contato</ModalHeader>
          <ModalCloseButton />
          <Box as="form" onSubmit={handleSubmit(submit)}>
            <ModalBody pb={6}>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl>
                    <FormLabel>Nome Completo</FormLabel>
                    <Input {...field} placeholder={patch?.name} />
                  </FormControl>
                )}
              />

              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input {...field} placeholder={patch?.email} />
                  </FormControl>
                )}
              />

              <Controller
                name="telephone"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl>
                    <FormLabel>Telefone</FormLabel>
                    <Input
                      as={InputMask}
                      {...field}
                      placeholder={patch?.telephone}
                      mask={"(99)99999-9999"}
                    />
                  </FormControl>
                )}
              />
            </ModalBody>

            <ModalFooter>
              <Button mr={3} type="submit" isDisabled={!isValid}>
                Salvar
              </Button>
              <Button onClick={onClose}>Cancelar</Button>
            </ModalFooter>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalContact;
