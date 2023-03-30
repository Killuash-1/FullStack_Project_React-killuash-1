import {
 
  Flex,
  IconButton,
  useColorMode,
  useBreakpointValue,
 
} from "@chakra-ui/react";
import {  SunIcon, MoonIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import CherryLogo from "../logotipo";

interface iHeader{
  isHomePage: boolean
}
function Header({ isHomePage }:iHeader) {
  const { colorMode, toggleColorMode } = useColorMode();
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bg="gray.800"
      color="white"
    >
      <CherryLogo />
      <Flex alignItems="center">
        {isHomePage && (
          <IconButton
            aria-label="Logout Button"
            icon={<ArrowForwardIcon />}
            // onClick={logout}
            variant="outline"
            mr={isMobile ? 0 : 4}
            mb={isMobile ? 4 : 0}
          />
        )}
        <IconButton
          aria-label="Dark Mode Button"
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          variant="outline"
          mr={isMobile ? 0 : 4}
          mb={isMobile ? 4 : 0}
        />
      </Flex>
    </Flex>
  );
}

export default Header;