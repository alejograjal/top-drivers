import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "components/Modal/Modal";
import { useSnackbar } from "stores/useSnackbar"
import { ModalBody } from "components/Modal/ModalBody";
import { Button, Stack, Typography } from "@mui/material";
import { ModalFooter } from "components/Modal/ModalFooter";
import { ModalHeader } from "components/Modal/ModalHeader";
import { TopDriversErrorDetails } from "types/api-basereservation";
import { useDeleteImage } from "hooks/top-drivers/image/useDeleteImage";

interface ImageDeleteModalConfirmationProps {
    isModalOpen: boolean
    toggleIsOpen: () => void
    imageId: number
    title: string
}
export const ImageDeleteModalConfirmation = ({
    isModalOpen,
    toggleIsOpen,
    imageId,
    title
}: ImageDeleteModalConfirmationProps) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const setSnackbarMessage = useSnackbar((state) => state.setMessage);

    const { mutate: deleteImage } = useDeleteImage({
        onSuccess: (data: boolean) => {
            setSnackbarMessage(data ? "Imagen eliminada correctamente" : "Error al eliminar imagen", data ? "success" : "error");
            toggleIsOpen();
            navigate('/Imagen')
        },
        onError: (data: TopDriversErrorDetails) => {
            setSnackbarMessage(`${data.message}`, 'error');
            toggleIsOpen();
        },
        onSettled: () => {
            toggleIsOpen();
            setLoading(false);
        }
    })

    const handleConfirm = () => {
        setLoading(true);
        deleteImage(imageId)
    }

    return (
        <Modal
            isOpen={isModalOpen}
            toggleIsOpen={toggleIsOpen}
            sx={{
                width: { xs: '90vw', sm: '50%' },
                height: 'auto'
            }}
        >
            <ModalHeader
                toggleIsOpen={toggleIsOpen}
                title="Eliminación de imagen"
                subTitle={`Nombre: ${title}`}
            />
            <ModalBody heightModal="10%">
                <Typography fontSize={24} fontWeight={'bold'}>
                    ¿Esta seguro que desear eliminar la imagen?
                </Typography>
            </ModalBody>
            <ModalFooter>
                <Stack direction='row' spacing={2} width="100%">
                    <Button variant="outlined" onClick={toggleIsOpen} sx={{ flex: 1 }}>Cancelar</Button>
                    <Button
                        loading={loading}
                        loadingPosition="start"
                        variant="contained"
                        onClick={handleConfirm}
                        sx={{ flex: 1 }}
                    >
                        Confirmar
                    </Button>
                </Stack>
            </ModalFooter>

        </Modal >
    )
}