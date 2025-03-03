import { boolean, number, object, string } from "yup"

export const CourseDefaultValues = {
    id: 0,
    name: '',
    description: '',
    cost: '0',
    isPackage: false,
    isEnabled: true,
    duration: 0,
}

export const CourseSchema = object().shape({
    id: number(),
    name: string().required('El nombre es requerido'),
    description: string().required('La descripción es requerida'),
    cost: string().required('El costo es requerido')
        .test("is-number", "El costo debe ser un número válido", (value) => {
            if (!value) return false;
            return !isNaN(Number(value.replace(".", "").replace(",", ".")));
        })
        .test("min-value", "El costo no puede ser negativo", (value) => {
            if (!value) return false;
            const numericValue = Number(value.replace(".", "").replace(",", "."));
            return numericValue >= 0;
        }),
    isPackage: boolean(),
    isEnabled: boolean(),
    duration: number().required('La duración es requerida').min(0, "La duración no puede ser negativa"),
})