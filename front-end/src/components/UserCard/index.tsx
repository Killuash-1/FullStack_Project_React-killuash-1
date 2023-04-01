import ModalUser from "../ModalUser";
import { AddIcon } from "@chakra-ui/icons";
import { useContext } from "react";
import { Authorization } from "../../context/Authorization";
import { ModalContextManual } from "../../context/ModalContext";
import { Flex, Heading, IconButton } from "@chakra-ui/react";

function UserCard() {
  const { users, loading } = useContext(Authorization);
  const { onPost } = useContext(ModalContextManual);

  return (
    <>
      {!loading && (
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          flexWrap={{ base: "wrap", md: "nowrap" }}
          mb={4}
        >
          <Heading mr={{ base: 0, md: 4 }}>Ola {users?.name} !</Heading>
          <IconButton
            aria-label="Modal Button"
            fontSize=""
            icon={<AddIcon />}
            onClick={onPost}
            variant="outline"
            mr={{ base: 0, md: 4 }}
            mb={{ base: 4, md: 0 }}
          />
          <ModalUser />
        </Flex>
      )}
    </>
  );
}

export default UserCard;
