import { AddIcon } from "@chakra-ui/icons";
import {  Flex, Heading, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { useContext } from "react";
import { Authorization } from "../../context/Authorization";
import { ModalContextManual } from "../../context/ModalContext";
import ModalUser from "../ModalUser";


function UserCard() {
  const { users, loading } = useContext(Authorization);
  const { onPost } = useContext(ModalContextManual);
  const isMobile = useBreakpointValue({ base: true, md: false }); // define se o componente deve ser exibido em uma única linha ou em duas linhas

  return (
    <>
      {!loading && (
        <Flex
          justifyContent={isMobile ? "center" : "space-between"} // centraliza o conteúdo em telas menores ou alinha à direita em telas maiores
          alignItems={"center"} // centraliza verticalmente
          flexWrap={isMobile ? "wrap" : "nowrap"} // define se o conteúdo deve ser exibido em uma única linha ou em duas linhas
          mb={4} // adiciona um espaçamento inferior
        >
          <Heading mr={isMobile ? 0 : 4}>Ola {users?.name} !</Heading>
          <IconButton
            aria-label="Modal Button"
            icon={<AddIcon />}
            onClick={onPost}
            variant="outline"
            mr={isMobile ? 0 : 4} // adiciona um espaçamento à direita em telas menores
            mb={isMobile ? 4 : 0} // adiciona um espaçamento inferior em telas menores
          />
          <ModalUser />
        </Flex>
      )}
    </>
  );
}

export default UserCard;
