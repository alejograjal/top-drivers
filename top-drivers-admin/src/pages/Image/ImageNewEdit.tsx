import { isNil } from "lodash"
import { useState } from "react"
import { isPresent } from "utils/util"
import { useLayout } from "hooks/useLayout"
import { Page } from "components/Shared/Page"
import { useNavigate } from "react-router-dom"
import { useSnackbar } from "stores/useSnackbar"
import { yupResolver } from "@hookform/resolvers/yup"
import { PageHeader } from "components/Shared/PageHeader"
import { FormButtons } from "components/Shared/FormButtons"
import { ImageDefaultValues, ImageSchema } from "./ImageSchema"
import { usePutImage } from "hooks/top-drivers/image/usePutImage"
import { usePostImage } from "hooks/top-drivers/image/usePostImage"
import { ImagePreview } from "components/ImagePreview/ImagePreview"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { FormFieldErrorMessage } from "components/FormFieldErrorMessage"
import { Image, TopDriversErrorDetails } from "types/api-basereservation"
import { Alert, Box, Button, FormControlLabel, Stack, Switch, TextField } from "@mui/material"
import { ImageDeleteModalConfirmation } from "./ImageDeleteModalConfirmation"

export const ImageNewEdit = ({ imageData }: { imageData: Image | undefined | null }) => {
    const navigate = useNavigate();
    const { isMobile } = useLayout();
    const setSnackbarMessage = useSnackbar((state) => state.setMessage);

    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(imageData?.url || null);

    const formTitle = isNil(imageData) ? 'Crear nueva imagen' : `Editar imagen número ${imageData.id}`;
    const isExisting = !isNil(imageData);

    const [openModalConfirmation, setOpenModalConfirmation] = useState(false);

    const formMethods = useForm({
        resolver: yupResolver(ImageSchema),
        defaultValues: !isExisting ? ImageDefaultValues : {
            id: Number(imageData?.id),
            name: String(imageData?.name),
            description: String(imageData?.description),
            resource: undefined,
            isEnabled: imageData?.isEnabled,
        }
    })

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = formMethods;

    const { mutate: postImage } = usePostImage({
        onSuccess() {
            setSnackbarMessage('Imagen creada correctamente', 'success');
            navigate('/Imagen');
        },
        onError(data: TopDriversErrorDetails) {
            setSnackbarMessage(String(data.message), 'error');
        },
        onSettled() {
            setLoading(false);
        }
    });

    const { mutate: putImage } = usePutImage({
        onSuccess() {
            setSnackbarMessage('Imagen actualizada correctamente', 'success');
            navigate('/Imagen');
        },
        onError(data: TopDriversErrorDetails) {
            setSnackbarMessage(String(data.message), 'error');
        },
        onSettled() {
            setLoading(false);
        }
    })

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            if (!['image/jpeg', 'image/png'].includes(file.type)) {
                setSnackbarMessage('Solo se permiten imágenes en formato JPG o PNG', 'error');
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                setSnackbarMessage('El tamaño máximo permitido es 5MB', 'error');
                return;
            }

            setValue("resource", file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const createImageWrapper = handleSubmit((data) => {
        setLoading(true);
        const formatedData = {
            Name: data.name,
            Description: data.description,
            Resource: data.resource,
            IsEnabled: data.isEnabled,
        }

        if (!isExisting) {
            postImage(formatedData);
            return;
        }

        putImage({
            Id: data.id,
            ...formatedData
        })
    })

    return (
        <Page
            header={
                <PageHeader
                    title={formTitle}
                    subtitle="Debe completar los campos requeridos antes de guardar la información"
                    backText="Imagenes"
                    backPath="/Imagen"
                    actionButton={
                        <Button sx={{ display: `${isExisting ? 'block' : 'none'}` }} variant="contained" size="large" fullWidth onClick={() => setOpenModalConfirmation(true)}>
                            Eliminar
                        </Button>
                    }
                />
            }
        >
            <FormProvider {...formMethods}>
                <form onSubmit={createImageWrapper} noValidate>
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
                                placeholder="Nombre de la imagen"
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
                                placeholder="Descripción de la imagen"
                                fullWidth
                                {...register('description')}
                            />
                            {errors.description?.message && (
                                <FormFieldErrorMessage message={errors.description.message} />
                            )}
                        </Box>

                        <Box display="flex" flexDirection="column" alignItems="center">
                            <ImagePreview imageSrc={preview} />
                            <input
                                type="file"
                                accept="image/jpeg, image/png"
                                onChange={handleFileChange}
                                style={{ display: "none" }}
                                id="file-upload"
                            />
                            <label htmlFor="file-upload" style={{ width: "100%" }}>
                                <Button variant="contained" component="span" fullWidth>
                                    Seleccionar Imagen
                                </Button>
                            </label>
                            {errors.resource?.message && (
                                <FormFieldErrorMessage message={errors.resource.message} />
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
                                                disabled={!isExisting}
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

                        <FormButtons backPath="/Imagen" loadingIndicator={loading} />
                    </Stack>

                </form>
            </FormProvider>

            <ImageDeleteModalConfirmation
                isModalOpen={openModalConfirmation}
                toggleIsOpen={() => setOpenModalConfirmation(!openModalConfirmation)}
                imageId={imageData?.id ?? 0}
                title={imageData?.name ?? ''}
            />

        </Page>
    )
}