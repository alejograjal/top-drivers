import { create } from "zustand"
import { AlertColor, SnackbarOrigin } from "@mui/material"

interface SnackbarState {
    visible: boolean
    message: string | null
    setMessage: (
        message: string | null,
        severity?: AlertColor,
        anchorOrigin?: SnackbarOrigin
    ) => void
    severity?: AlertColor
    anchorOrigin?: SnackbarOrigin
}

const defaultAnchorOrigin: SnackbarOrigin = { vertical: 'top', horizontal: 'center' };

export const useSnackbar = create<SnackbarState>((set) => ({
    visible: false,
    message: null,
    setMessage: (
        message,
        severity = undefined,
        anchorOrigin = defaultAnchorOrigin
    ) => {
        if (message !== null) {
            set({ visible: true, message, severity, anchorOrigin })
        } else {
            set({ visible: false, message: null })
        }
    }
}))