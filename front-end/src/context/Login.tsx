import { useToast } from "@chakra-ui/react";
import { createContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { iReactNode, iOnSubmitLogin } from "../interfaces/context";
import { iYupformLogin } from "../interfaces/login";
import Api from "../services";
import { LoginApi } from "../services/LoginApi";

export const LoginUser = createContext({} as iOnSubmitLogin);

function LoginClient({ children }: iReactNode){
  const [loginLoad, setLoginLoad] = useState(false);
  // const [redirect, setRedirect] = useState(true)
  const toast = useToast();
  const nav = useNavigate()
  const location = useLocation()
  const OnSubmitLogin = async (data: iYupformLogin) => {

    
    try {
      setLoginLoad(true);
      const { token } = await LoginApi(data);

      Api.defaults.headers.authorization = `Bearer ${token}`;


      
      localStorage.setItem("token", token);
      
      setLoginLoad(false);

      const navegateTo = location.state.from.pathname || "HomePage"
      nav(navegateTo, {replace: true})
      toast({
        title: "Login realizado com sucesso!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      nav("/HomePage")
    } catch (error) {
      console.error(error);
      setLoginLoad(false);
      toast({
        title: "Ops! algo deu errado!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <LoginUser.Provider value={{ OnSubmitLogin, loginLoad }}>
      {children}
    </LoginUser.Provider>
  );
}
export default LoginClient;
