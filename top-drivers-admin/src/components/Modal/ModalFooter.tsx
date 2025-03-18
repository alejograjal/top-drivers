import { Box } from "@mui/system";

interface ModalFooterProps {
    children: React.ReactNode,
    leftFooter?: React.ReactNode
}

export const ModalFooter = ({
    children,
    leftFooter
}: ModalFooterProps) => {
    return (
        <Box sx={{ width: '100%', borderTop: '1px solid #fff' }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    px: '2rem',
                    py: '1rem',
                    columnGap: '0.5rem',
                    justifyContent: leftFooter ? 'space-between' : 'flex-end',
                    alignItems: 'center',
                    width: '100%'
                }}
            >
                {leftFooter}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        width: { xs: "100%", sm: "auto" }
                    }}
                >{children}</Box>
            </Box>
        </Box>
    )
}