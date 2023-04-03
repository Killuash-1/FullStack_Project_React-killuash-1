import {
  PostContacts,
  PatchContacts,
  DeleteContacts,
  GetContactId,
} from "../services/ContactRequests";
import { iReactNode } from "../interfaces/context";
import { Authorization } from "./Authorization";
import { iModalContextPatch } from "../interfaces/modal";
import { iContactRegisterPatch } from "../interfaces/patch/patch";
import { createContext, useContext } from "react";
import Api from "../services";
import { useToast } from "@chakra-ui/react";

export interface iContactContext {
  updateContact: (
    body: iContactRegisterPatch,
    patch: iModalContextPatch | undefined
  ) => Promise<void>;
  postContact: (body: iContactRegisterPatch) => Promise<void>;
  deleteContact: (id: string) => Promise<void>;
}

export const ContactContext = createContext({} as iContactContext);


function ContactRequest({ children }: iReactNode) {
  const { GetReload } = useContext(Authorization);
  const toast = useToast()
  const postContact = async (body: iContactRegisterPatch) => {
    const token = localStorage.getItem("token");
    try {
      Api.defaults.headers.authorization = `Bearer ${token}`;
      await PostContacts(body);
      
      await GetReload();
    } catch (error) {
      console.error(error);
    }
  };
  
  const updateContact = async (
    body: iContactRegisterPatch, 
    patch?: iModalContextPatch 
    ) => {
      const token = localStorage.getItem("token");
      try {
        
        
        Api.defaults.headers.authorization = `Bearer ${token}`;
        
        const data = await GetContactId(patch?.id)
        
        const clienteNovo = {
          ...data, 
          name: body?.name || data.name, 
          email: body?.email || data.email,
          telephone: body?.telephone || data.telephone 
        };

      await PatchContacts(clienteNovo, patch!.id);

      await GetReload();
      toast({
        title: "Alterado com sucesso !",
        status: "success",
        duration:3000,
        isClosable: true
      })
    } catch (error) {
      toast({
        title: "Ops algo deu errado !",
        status: "error",
        duration:3000,
        isClosable: true
      })
      console.error(error);
    }
  };

  const deleteContact = async (id: string) => {
    const token = localStorage.getItem("token");

    try {
      Api.defaults.headers.authorization = `Bearer ${token}`;

      await DeleteContacts(id);
      await GetReload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ContactContext.Provider
      value={{ postContact, updateContact, deleteContact }}
    >
      {children}
    </ContactContext.Provider>
  );
}

export default ContactRequest;
