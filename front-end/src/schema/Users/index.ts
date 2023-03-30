import * as yup from "yup"

export const RegisterformSchema = yup.object().shape({
    name: yup.string().required("Nome obrigatorio"),
    email: yup.string().required("E-mail obrigatorio").email("E-mail invalido"),
    password: yup
      .string()
      .required("Senha obrigatoria")
      .min(8, "Minimo de oito digitos"),
    telephone: yup.string().required("Telefone obrigatorio").min(11),
  });

export  const LoginformSchema = yup.object().shape({
    email: yup.string().email("E-mail invalido.").required("E-mail obrigatorio."),
    password: yup.string().min(8).required("Senha obrigatoria")
})
