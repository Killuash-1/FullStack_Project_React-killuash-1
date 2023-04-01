import CherryLogo from "../logotipo";
import { useNavigate } from "react-router-dom";
import { Flex, IconButton, useColorMode } from "@chakra-ui/react";
import { SunIcon, MoonIcon, ArrowForwardIcon } from "@chakra-ui/icons";

interface iHeader {
  isHomePage: boolean;
}
function Header({ isHomePage }: iHeader) {
  const { colorMode, toggleColorMode } = useColorMode();

  const nav = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    nav("/", { replace: true });
  };
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      boxShadow="md"
      bg={colorMode === "light" ? "whiteAlpha.900" : "gray.800"}
      color="white"
      position={"-webkit-sticky"}
    >
      <CherryLogo />
      <Flex gap="16px">
        {isHomePage && (
          <IconButton
            aria-label="Logout Button"
            icon={<ArrowForwardIcon />}
            onClick={() => logout()}
            variant="outline"
            mr={{ base: 0, md: 4 }}
            mb={{ base: 4, md: 0 }}
          />
        )}
        <IconButton
          aria-label="Dark Mode Button"
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          variant="outline"
          mr={{ base: 0, md: 4 }}
          mb={{ base: 4, md: 0 }}
        />
      </Flex>
    </Flex>
  );
}

export default Header;
