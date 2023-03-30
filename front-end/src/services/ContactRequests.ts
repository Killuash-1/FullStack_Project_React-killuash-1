import Api from ".";
import { iContactRegisterPatch } from "../interfaces/patch/patch";
import { iContactsProfile } from "./Profile";



export async function PostContacts(body:iContactRegisterPatch) {
    const {data} = await Api.post<iContactRegisterPatch>("/contacts", body)
    return data
}

export async function PatchContacts(body:iContactRegisterPatch, id:string) {
    const {data} = await Api.patch<iContactRegisterPatch>(`/contacts/${id}`, body)

    return data
}

export async function DeleteContacts( id:string) {
 await Api.delete<iContactRegisterPatch>(`/contacts/${id}`)

}
