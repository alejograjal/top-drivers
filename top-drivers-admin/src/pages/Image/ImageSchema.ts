import { boolean, mixed, number, object, string } from "yup"

export const ImageDefaultValues = {
    id: 0,
    name: '',
    description: '',
    resource: {} as File,
    isEnabled: true,
}

export const ImageSchema = (isExisting: boolean) => object().shape({
    id: number(),
    name: string().required('El nombre es requerido'),
    description: string().required('La descripción es requerida'),
    resource: mixed()
        .test("resourceRequired", "El archivo es requerido", function (value) {
            if (!isExisting && !value) { // Si no es una edición, y no hay archivo
                return this.createError({ message: "El archivo es requerido" });
            }
            return true;
        })
        .test("fileSize", "El archivo es muy grande (máx. 5MB)", (value) => {
            if (value instanceof File) {
                return value.size <= 5 * 1024 * 1024;
            }
            return true;
        })
        .test("fileType", "Formato no permitido (solo JPG/PNG)", (value) => {
            if (value instanceof File) {
                return ["image/jpeg", "image/png"].includes(value.type);
            }
            return true;
        }),
    isEnabled: boolean(),
})