import { Box, Typography } from "@mui/material"

export const ErrorProcess = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center',
                textAlign: 'center',
            }}
        >
            <Typography variant="body2">Ha ocurrido un error al momento de consultar la información</Typography>
        </Box>
    )
}