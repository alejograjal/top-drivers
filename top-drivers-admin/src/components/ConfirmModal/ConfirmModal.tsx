import { Modal } from "components/Modal/Modal"
import { Box, Button, Typography } from "@mui/material"

interface ConfirmModalProps {
    isModalOpen: boolean,
    toggleIsOpen: () => void,
    onConfirm: () => void,
    onCancel: () => void,
    confirmMessage: string,
    secondaryMessage: string,
}

export const ConfirmModal = ({
    isModalOpen,
    toggleIsOpen,
    onConfirm,
    onCancel,
    confirmMessage,
    secondaryMessage
}: ConfirmModalProps) => {
    return (
        <Modal
            isOpen={isModalOpen}
            toggleIsOpen={toggleIsOpen}
            sx={{
                width: { xs: '90vw', sm: '40vw' }
            }}
        >
            <Box>
                <Box
                    sx={{
                        px: { xs: '24px', sm: '50px' },
                        py: { xs: '80px', sm: '100px' },
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignContent: 'center',
                        textAlign: 'center'
                    }}
                >
                    <Typography variant="h3" fontWeight={'bold'} sx={{ lineHeight: { xs: '24px', sm: '33px' } }}>
                        {confirmMessage}
                    </Typography>
                    <Typography sx={{ lineHeight: { mt: '26px', color: 'primary.main' } }}>
                        {secondaryMessage}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        p: '100px',
                        justifyContent: {
                            xs: 'normal',
                            sm: 'end'
                        },
                        borderTop: 1,
                        borderTopColor: 'grey(300)'
                    }}
                >
                    <Button variant="text" onClick={onCancel}>
                        Cancelar
                    </Button>
                    <Button variant="contained" onClick={onConfirm}>
                        Confirmar
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}