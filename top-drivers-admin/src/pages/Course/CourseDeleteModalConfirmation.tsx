import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "components/Modal/Modal";
import { useSnackbar } from "stores/useSnackbar"
import { ModalBody } from "components/Modal/ModalBody";
import { Button, Stack, Typography } from "@mui/material";
import { ModalFooter } from "components/Modal/ModalFooter";
import { ModalHeader } from "components/Modal/ModalHeader";
import { TopDriversErrorDetails } from "types/api-basereservation";
import { useDeleteCourse } from "hooks/top-drivers/course/useDeleteCourse";

interface CourseDeleteModalConfirmationProps {
    isModalOpen: boolean
    toggleIsOpen: () => void
    courseId: number
    title: string
}
export const CourseDeleteModalConfirmation = ({
    isModalOpen,
    toggleIsOpen,
    courseId,
    title
}: CourseDeleteModalConfirmationProps) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const setSnackbarMessage = useSnackbar((state) => state.setMessage);

    const { mutate: deleteCourse } = useDeleteCourse({
        onSuccess: (data: boolean) => {
            setSnackbarMessage(data ? "Curso eliminado correctamente" : "Error al eliminar curso", data ? "success" : "error");
            toggleIsOpen();
            navigate('/Curso')
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
        deleteCourse(courseId)
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
                title="Eliminación de curso"
                subTitle={`Nombre: ${title}`}
            />
            <ModalBody heightModal="10%">
                <Typography fontSize={24} fontWeight={'bold'}>
                    ¿Esta seguro que desear eliminar el curso?
                </Typography>
            </ModalBody>
            <ModalFooter>
                <Stack direction='row' spacing={2}>
                    <Button variant="outlined" onClick={toggleIsOpen}>Cancelar</Button>
                    <Button
                        loading={loading}
                        loadingPosition="start"
                        variant="contained"
                        onClick={handleConfirm}
                    >
                        Confirmar
                    </Button>
                </Stack>
            </ModalFooter>

        </Modal >
    )
}