import { useSnackbar } from "stores/useSnackbar"
import { Alert, Snackbar as MuiSnackbar } from "@mui/material"

export const Snackbar = () => {
    const isVisible = useSnackbar((state) => state.visible)
    const message = useSnackbar((state) => state.message)
    const severity = useSnackbar((state) => state.severity)
    const setMessage = useSnackbar((state) => state.setMessage)
    const anchorOrigin = useSnackbar((state) => state.anchorOrigin)

    const handleClose = () => {
        setMessage(null);
    };

    return (
        <MuiSnackbar
            autoHideDuration={3000}
            open={isVisible}
            onClose={handleClose}
            anchorOrigin={anchorOrigin}
        >
            <Alert severity={severity}>{message}</Alert>
        </MuiSnackbar>
    )
}