import { InferType, object, string } from "yup";

export const LoginDefaultValues = {
    nickName: '',
    password: '',
};

export const LoginSchema = object().shape({
    nickName: string().required('El correo electrónico es requerido'),
    password: string().required('La contraseña es requerida')
})

export type LoginTypeForm = InferType<typeof LoginSchema>