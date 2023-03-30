import Api from "../services";
import { createContext, useContext } from "react";
import { iReactNode } from "../interfaces/context";
import { iContactRegisterPatch } from "../interfaces/patch/patch";
import { DeleteContacts, PatchContacts, PostContacts } from "../services/ContactRequests";
import { iModalContextPatch } from "../interfaces/modal";
import { Authorization } from "./Authorization";


export interface iContactContext {
  updateContact: (
    body: iContactRegisterPatch,
    patch: iModalContextPatch | undefined
  ) => Promise<void>;
  postContact: (body: iContactRegisterPatch) => Promise<void>
  deleteContact: (id: string) => Promise<void>
}

export const ContactContext = createContext({} as iContactContext);

function ContactRequest({ children }: iReactNode) {
  const { GetReload } = useContext(Authorization);
 
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
    patch: iModalContextPatch | undefined
  ) => {
    const token = localStorage.getItem("token");
    try {
      Api.defaults.headers.authorization = `Bearer ${token}`;
      await PatchContacts(body, patch!.id);

      await GetReload();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteContact = async (id:string)=> {
    const token = localStorage.getItem("token")

    try{
      Api.defaults.headers.authorization = `Bearer ${token}`

      await DeleteContacts(id)
      await GetReload()
    }catch(error){
      console.error(error)
    }
  }

  return (
    <ContactContext.Provider value={{ postContact, updateContact, deleteContact }}>
      {children}
    </ContactContext.Provider>
  );
}

export default ContactRequest;
