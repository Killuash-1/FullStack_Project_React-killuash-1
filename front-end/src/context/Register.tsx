import { useToast } from "@chakra-ui/react";
import { iYupForm } from "../interfaces/register";
import { RegisterApi } from "../services/RegisterApi";
import { createContext, useState } from "react";
import { iOnSubmitObject, iReactNode } from "../interfaces/context";

export const RegisterUser = createContext({} as iOnSubmitObject);

const RegisterClient = ({ children }: iReactNode) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const OnSubmitObject = async (data: iYupForm) => {
    try {
      setLoading(true);
      await RegisterApi(data);

      setLoading(false);
      toast({
        title: "Cadastro realizado com sucesso!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      setLoading(false);
      toast({
        title: "Ops! algo deu errado!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error(error);
    }
  };

  return (
    <RegisterUser.Provider value={{ OnSubmitObject, loading }}>
      {children}
    </RegisterUser.Provider>
  );
};

export default RegisterClient;
