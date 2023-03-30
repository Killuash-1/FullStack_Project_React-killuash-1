
import { iYupformLogin } from "../login";
import { iYupForm } from "../register";

export interface iOnSubmitObject{
    OnSubmitObject: (data: iYupForm) => Promise<void>
    loading: boolean
}
export interface iReactNode{
    children: React.ReactNode
}

export interface iOnSubmitLogin{
    OnSubmitLogin: (data: iYupformLogin) => Promise<void>
    loginLoad: boolean
}


