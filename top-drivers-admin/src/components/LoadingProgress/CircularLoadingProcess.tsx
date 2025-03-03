import { Box, CircularProgress } from "@mui/material"

export const CircularLoadingProgress = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <CircularProgress sx={{ color: 'primary.main' }} />
        </Box>
    )
}