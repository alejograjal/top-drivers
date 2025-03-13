import { useLayout } from "hooks/useLayout"
import { Box, Button, Stack } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

interface FormButtonsProps {
    backPath: string,
    loadingIndicator: boolean
}

export const FormButtons = ({ backPath, loadingIndicator }: FormButtonsProps) => {
    const { isMobile } = useLayout();

    if (isMobile) {
        return (
            <Box display='flex' justifyContent='space-between' maxWidth='100vw' gap='8px'>
                <Box flex={1} px={1} pr={2} sx={{ pl: 0 }}>
                    <RouterLink to={backPath}>
                        <Button variant="outlined" fullWidth>Cancelar</Button>
                    </RouterLink>
                </Box>
                <Box flex={1} px={1} pl={2} sx={{ pr: 0 }}>
                    <Button loading={loadingIndicator} loadingPosition="start" type="submit" variant="contained" fullWidth>
                        Guardar
                    </Button>
                </Box>
            </Box>
        )
    }

    return (
        <Stack direction='row' spacing={2} justifyContent='flex-end'>
            <RouterLink to={backPath}>
                <Button variant="outlined">Cancelar</Button>
            </RouterLink>
            <Button loading={loadingIndicator} loadingPosition="start" type="submit" variant="contained">
                Guardar
            </Button>
        </Stack>
    )
}