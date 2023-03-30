import {
  Flex,
  Box,
  Text,
  useColorMode,
  Heading,
  Button,
} from "@chakra-ui/react";
import { useSpring, animated } from "react-spring";
import Header from "../../components/header";
import Login from "../../components/login";
import SignUpForm from "../../components/SignUp";


function LandingPage() {
  const { colorMode } = useColorMode();

 

  return (
    <>
      <Header isHomePage={false}/>
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        height={"100vh"}
        width={"100vw"}
      >
        <Login />
        <SignUpForm />
      </Flex>
    </>
  );
}

export default LandingPage;
