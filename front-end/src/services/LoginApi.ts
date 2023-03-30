import Api from ".";
import { iYupformLogin } from "../interfaces/login";


export interface iLoginApi{
    token: string;
}

export async function LoginApi(params:iYupformLogin) {
    const {data} = await Api.post<iLoginApi>("/login", params)
    return data
}