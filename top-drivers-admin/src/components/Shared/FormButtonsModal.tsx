import { useLayout } from "hooks/useLayout"
import { Box, Button, Stack } from "@mui/material";

interface FormButtonsProps {
    onCloseModal: () => void
}

export const FormButtonsModal = ({ onCloseModal }: FormButtonsProps) => {
    const { isMobile } = useLayout();

    if (isMobile) {
        return (
            <Box display='flex' justifyContent='space-between' maxWidth='100vw' gap='8px'>
                <Box flex={1} px={1} pr={2} sx={{ pl: 0 }}>
                    <Button onClick={onCloseModal} variant="outlined" fullWidth>Cancelar</Button>
                </Box>
                <Box flex={1} px={1} pl={2} sx={{ pr: 0 }}>
                    <Button loadingPosition="start" type="submit" variant="contained" fullWidth>
                        Guardar
                    </Button>
                </Box>
            </Box>
        )
    }

    return (
        <Stack direction='row' spacing={2} justifyContent='flex-end'>
            <Button onClick={onCloseModal} variant="outlined" fullWidth>Cancelar</Button>
            <Button loadingPosition="start" type="submit" variant="contained" fullWidth>
                Guardar
            </Button>
        </Stack>
    )
}