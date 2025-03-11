import { boolean, mixed, number, object, string } from "yup"

export const ImageDefaultValues = {
    id: 0,
    name: '',
    description: '',
    resource: {} as File,
    isEnabled: true,
}

export const ImageSchema = object().shape({
    id: number(),
    name: string().required('El nombre es requerido'),
    description: string().required('La descripción es requerida'),
    resource: mixed<File>()
        .required("El archivo es requerido")
        .test("fileSize", "El archivo es muy grande (máx. 5MB)", (value) => {
            return value && value.size <= 5 * 1024 * 1024;
        })
        .test("fileType", "Formato no permitido (solo JPG/PNG)", (value) => {
            return value && ["image/jpeg", "image/png"].includes(value.type);
        }),
    isEnabled: boolean(),
})