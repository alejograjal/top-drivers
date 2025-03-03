import { isNil } from "lodash";
import { useState } from "react";
import { isPresent } from "utils/util";
import { useLayout } from "hooks/useLayout";
import { Page } from "components/Shared/Page";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "stores/useSnackbar";
import { NumericFormat } from "react-number-format";
import { yupResolver } from "@hookform/resolvers/yup";
import { PageHeader } from "components/Shared/PageHeader";
import { FormButtons } from "components/Shared/FormButtons";
import { CourseDefaultValues, CourseSchema } from "./CourseSchema";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Alert, Box, Button, FormControlLabel, Stack, Switch, TextField } from "@mui/material";
import { usePostCourse } from "hooks/top-drivers/course/usePostCourse";
import { FormFieldErrorMessage } from "components/FormFieldErrorMessage";
import { Course, TopDriversErrorDetails } from "types/api-basereservation";
import { usePutCourse } from "hooks/top-drivers/course/usePutCourse";
import { CourseDeleteModalConfirmation } from "./CourseDeleteModalConfirmation";

export const CourseNewEdit = ({ courseData }: { courseData: Course | undefined | null }) => {
    const navigate = useNavigate();
    const { isMobile } = useLayout();
    const setSnackbarMessage = useSnackbar((state) => state.setMessage);

    const [loading, setLoading] = useState(false);

    const formTitle = isNil(courseData) ? 'Crear nuevo curso' : `Editar curso número ${courseData.id}`;
    const isExisting = !isNil(courseData);

    const [openModalConfirmation, setOpenModalConfirmation] = useState(false);

    const formMethods = useForm({
        resolver: yupResolver(CourseSchema),
        defaultValues: !isExisting ? CourseDefaultValues : {
            id: Number(courseData?.id),
            name: String(courseData?.name),
            description: String(courseData?.description),
            cost: String(courseData?.cost),
            isPackage: courseData?.isPackage,
            isEnabled: courseData?.isEnabled,
            duration: courseData?.duration
        }
    })

    const {
        control,
        register,
        handleSubmit,
        formState: { errors }
    } = formMethods;

    const { mutate: postCourse } = usePostCourse({
        onSuccess() {
            setSnackbarMessage('Curso creado correctamente', 'success');
            navigate('/Curso');
        },
        onError(data: TopDriversErrorDetails) {
            setSnackbarMessage(String(data.message), 'error');
        },
        onSettled() {
            setLoading(false);
        }
    });

    const { mutate: putCourse } = usePutCourse({
        onSuccess() {
            setSnackbarMessage('Curso actualizado correctamente', 'success');
            navigate('/Curso');
        },
        onError(data: TopDriversErrorDetails) {
            setSnackbarMessage(String(data.message), 'error');
        },
        onSettled() {
            setLoading(false);
        }
    })

    const createCourseWrapper = handleSubmit((data) => {
        setLoading(true);
        const formatedData = {
            name: data.name,
            description: data.description,
            cost: Number(data.cost.replace(",", "")),
            isPackage: data.isPackage,
            isEnabled: data.isEnabled,
            duration: data.duration
        }

        if (!isExisting) {
            postCourse(formatedData);
            return;
        }

        putCourse({
            id: data.id,
            ...formatedData
        })
    })

    return (
        <Page
            header={
                <PageHeader
                    title={formTitle}
                    subtitle="Debe completar los campos requeridos antes de guardar la información"
                    backText="Cursos"
                    backPath="/Curso"
                    actionButton={
                        <Button sx={{ display: `${isExisting ? 'block' : 'none'}` }} variant="contained" size="large" fullWidth onClick={() => setOpenModalConfirmation(true)}>
                            Eliminar
                        </Button>
                    }
                />
            }
        >
            <FormProvider {...formMethods}>
                <form onSubmit={createCourseWrapper} noValidate>
                    <Box pb={2}>
                        {Object.keys(errors).length > 0 && (
                            <Alert severity="error">Por favor corrija los errores para continuar</Alert>
                        )}
                    </Box>
                    <Stack spacing={4} maxWidth={isMobile ? '90vw' : '600px'}>
                        <Box>
                            <TextField
                                required
                                error={isPresent(errors.name)}
                                label="Nombre"
                                placeholder="Nombre del curso"
                                fullWidth
                                {...register('name')}
                            />
                            {errors.name?.message && (
                                <FormFieldErrorMessage message={errors.name.message} />
                            )}
                        </Box>

                        <Box>
                            <TextField
                                required
                                error={isPresent(errors.description)}
                                label="Descripción"
                                multiline
                                placeholder="Descripción del curso"
                                fullWidth
                                {...register('description')}
                            />
                            {errors.description?.message && (
                                <FormFieldErrorMessage message={errors.description.message} />
                            )}
                        </Box>

                        <Box>
                            <Controller
                                name='cost'
                                control={control}
                                render={({ field: { ref, onChange, ...field } }) => (
                                    <NumericFormat
                                        {...field}
                                        inputRef={ref}
                                        customInput={TextField}
                                        label="Costo"
                                        variant="outlined"
                                        fullWidth
                                        thousandSeparator=","
                                        decimalSeparator="."
                                        allowNegative={false}
                                        onValueChange={(values) => {
                                            onChange(values.floatValue);
                                        }}
                                    />
                                )}
                            />
                            {errors.cost?.message && (
                                <FormFieldErrorMessage message={errors.cost.message} />
                            )}
                        </Box>

                        <Box>
                            <TextField
                                required
                                error={isPresent(errors.duration)}
                                label="Duración"
                                placeholder="Duración en horas"
                                type="number"
                                variant="outlined"
                                fullWidth
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                                {...register('duration')}
                            />
                            {errors.duration?.message && (
                                <FormFieldErrorMessage message={errors.duration.message} />
                            )}
                        </Box>

                        <Box>
                            <Controller
                                name="isPackage"
                                control={control}
                                render={({ field }) => (
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                {...field}
                                                checked={field.value}
                                                onChange={(e) => field.onChange(e.target.checked)}
                                                color="primary"
                                            />
                                        }
                                        label="¿Es paquete?"
                                        labelPlacement="start"
                                    />
                                )}
                            />
                            {errors.isPackage?.message && (
                                <FormFieldErrorMessage message={errors.isPackage.message} />
                            )}
                        </Box>

                        <Box>
                            <Controller
                                name="isEnabled"
                                control={control}
                                render={({ field }) => (
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                {...field}
                                                checked={field.value}
                                                onChange={(e) => field.onChange(e.target.checked)}
                                                color="primary"
                                            />
                                        }
                                        labelPlacement="start"
                                        label="¿Visible?"
                                    />
                                )}
                            />
                            {errors.isEnabled?.message && (
                                <FormFieldErrorMessage message={errors.isEnabled.message} />
                            )}
                        </Box>


                        <FormButtons backPath="/Curso" loadingIndicator={loading} />
                    </Stack>
                </form>
            </FormProvider>

            <CourseDeleteModalConfirmation
                isModalOpen={openModalConfirmation}
                toggleIsOpen={() => setOpenModalConfirmation(!openModalConfirmation)}
                courseId={courseData?.id ?? 0}
                title={courseData?.name ?? ''}
            />
        </Page>
    )
}