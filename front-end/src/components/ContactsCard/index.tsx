import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Grid,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useContext } from "react";

import { BsThreeDotsVertical } from "react-icons/bs";
import { ModalContextManual } from "../../context/ModalContext";
import ModalContact from "../ModalContact";
import { Authorization } from "../../context/Authorization";
import { iModalContextPatch } from "../../interfaces/modal";

import { ContactContext } from "../../context/ContactsRequests";

interface iContactsCardProps {
  name: string;
  email: string;
  phone: string;
  id: iModalContextPatch;
}

export function ContactsCard({ name, email, phone, id }: iContactsCardProps) {
  const { onOpen, setPatch,} = useContext(ModalContextManual);
  const { deleteContact} = useContext(ContactContext);
  const getId = (id: iModalContextPatch) => {
    setPatch(id);
  };

  const removecontact = async (id:iModalContextPatch) => {
  
   await deleteContact(id.id)
  }
  
  
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      mb={4}
      ml={4}
      boxShadow="md"
      border={"7px"}
      display={"flex"}
      justifyContent={"space-between"}
    >
      <Box>
        <Heading size="md">{name}</Heading>
        <Text fontSize="sm" color="gray.500" mb={2}>
          {email}
        </Text>
        <Text fontSize="sm" color="gray.500">
          {phone}
        </Text>
      </Box>

      <Box>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<BsThreeDotsVertical />}
            variant="outline"
            onClick={() => getId(id)}
          />
          <MenuList>
            <MenuItem icon={<DeleteIcon />} onClick={() => removecontact(id)}>
              Deletar contato
            </MenuItem>
            <MenuItem icon={<EditIcon />} onClick={onOpen}>
              Editar Contato
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <ModalContact />
    </Box>
  );
}





function ContactsList() {
  const { loading, users } = useContext(Authorization);

  if (loading) {
    return (
      <Box textAlign="center" mt={8}>
        <Spinner size="lg" />
      </Box>
    );
  }

  return (
    <Box
      maxW={"800px"}
      mx={"auto"}
      my={4}
      border={"1px"}
      borderRadius={"lg"}
      boxShadow={"md"}
      p={4}
    >
      <Heading size="lg" mb={4}>
        Lista de Contatos
      </Heading>
      <Grid
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} 
        gap={4} 
      >
        {users?.contacts.map((contact) => {
          return (
            <ContactsCard
              key={contact.id}
              name={contact.name}
              email={contact.email}
              phone={contact.telephone}
              id={contact}
            />
          );
        })}
      </Grid>
    </Box>
  );
}

export default ContactsList;