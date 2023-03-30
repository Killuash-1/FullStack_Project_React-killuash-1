import * as yup from "yup"

export const ContactformSchema = yup.object().shape({

    name: yup.string(),
    email: yup.string().email("E-mail invalido"),
    telephone: yup.string(),
}) 

export const ContactPostformSchema = yup.object().shape({

    name: yup.string(),
    email: yup.string().email("E-mail invalido"),
    telephone: yup.string(),
}) 