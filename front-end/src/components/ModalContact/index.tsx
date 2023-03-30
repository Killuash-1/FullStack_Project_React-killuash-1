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
} from "@chakra-ui/react";
import { ModalContextManual } from "../../context/ModalContext";
import { useContext, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ContactformSchema } from "../../schema/Contacts";
import {
  iYupContactForm,
  iYupContactFormErrors,
} from "../../interfaces/register";
import { iContactRegisterPatch } from "../../interfaces/patch/patch";
import { ContactContext } from "../../context/ContactsRequests";

function ModalContact() {
  const { isOpen, onClose, patch } = useContext(ModalContextManual);
  const { updateContact } = useContext(ContactContext);
 
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm<iYupContactForm, iYupContactFormErrors>({
    resolver: yupResolver(ContactformSchema),
  });

  const submit = async (data: iContactRegisterPatch) => {
    await updateContact(data, patch);
    onClose()
    reset()
  };

 

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edite seu contato</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(submit)}>
            <ModalBody pb={6}>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl>
                    <FormLabel>Nome Completo</FormLabel>
                    <Input {...field}  placeholder={patch?.name} />
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
                    <Input
                      {...field}
                      placeholder={patch?.email}
                    />
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
                      {...field}
                      
                      placeholder={patch?.telephone}
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
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalContact;
