import { Box, Text } from "@chakra-ui/react";

const CherryLogo = () => {
  return (
    <Box display={"flex"} justifyContent="center" alignItems="center">
      <Text
        fontSize="3xl"
        fontWeight="bold"
        textTransform="uppercase"
        color="red.500"
        fontFamily="Arial, sans-serif"
      >
        CherryCo
      </Text>
    </Box>
  );
};

export default CherryLogo;
