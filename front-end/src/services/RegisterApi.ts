import Api from ".";
import { iYupForm } from "../interfaces/register";

export interface iRegisterApi {
    id: string;
    name: string;
    email: string;
    telephone:string;
    created_at: Date;
}

export async function  RegisterApi(user: iYupForm){
  const { data }= await Api.post<iRegisterApi>("/users", user);
    return data
};

