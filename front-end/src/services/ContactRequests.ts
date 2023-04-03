import Api from ".";
import { iModalContextPatch } from "../interfaces/modal";
import { iContactRegisterPatch } from "../interfaces/patch/patch";



export async function GetContactId(id?:string) {
    const {data} = await Api.get<iContactRegisterPatch>(`/contacts/${id}`)
    return data
}

export async function PostContacts(body:iContactRegisterPatch) {
    const {data} = await Api.post<iContactRegisterPatch>("/contacts", body)
    return data
}

export async function PatchContacts(body:iContactRegisterPatch, id:string) {
    const {data} = await Api.patch<iContactRegisterPatch>(`/contacts/${id}`, body)
    console.log(data);
    
    return data
}

export async function DeleteContacts( id:string) {
 await Api.delete<iContactRegisterPatch>(`/contacts/${id}`)
}
