import { Box, Typography, useTheme } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

interface FormFieldErrorMessageProps {
    message: string
    variant?: string
    showIcon?: boolean
}

export const FormFieldErrorMessage = ({
    message,
    variant,
    showIcon = true
}: FormFieldErrorMessageProps) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                mt: '6px',
                display: 'flex',
                flexDirection: 'row',
                alignContent: 'start',
                alignItems: 'center',
                columnGap: '6px',
                color: '#CC2027',
                backgroundColor: variant === 'contained' ? `${theme.palette.error.main} !important` : '',
                borderRadius: '4px',
                height: variant === 'contained' ? '40px' : 'auto',
            }}
        >
            <Box sx={{ paddingLeft: variant === 'contained' ? '2%' : '', display: 'flex', alignItems: 'center' }}>
                {showIcon && <ErrorOutlineIcon />}
            </Box>
            <Typography
                variant="body2"
                sx={{
                    color: variant === 'contained' ? theme.palette.error.main : ''
                }}
            >
                {message}
            </Typography>
        </Box>
    )
}