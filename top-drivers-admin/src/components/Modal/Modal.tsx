import CloseIcon from '@mui/icons-material/Close'
import { Box, type SxProps, type Theme, Modal as MuiModal } from "@mui/material"

const commonSxModalProps: SxProps<Theme> = {
    backgroundColor: 'background.default',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    borderRadius: '8px'
}

interface ModalProps {
    children: React.ReactNode,
    isOpen: boolean,
    toggleIsOpen: () => void,
    showIconClose?: boolean,
    sx?: SxProps<Theme>
}

export const Modal = ({
    children,
    isOpen,
    toggleIsOpen,
    showIconClose,
    sx
}: ModalProps) => {
    return (
        <MuiModal open={isOpen} onClose={toggleIsOpen}>
            <Box sx={sx ? { ...commonSxModalProps, ...sx } : commonSxModalProps}>
                {showIconClose && (
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'end',
                            p: '16px'
                        }}
                    >
                        <Box onClick={toggleIsOpen} sx={{ cursor: 'pointer' }}>
                            <CloseIcon />
                        </Box>
                    </Box>
                )}
                {children}
            </Box>
        </MuiModal>
    )
}