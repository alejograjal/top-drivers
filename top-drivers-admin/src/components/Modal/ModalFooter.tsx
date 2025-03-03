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
                sx={{ display: 'flex', flexDirection: 'row', px: '2rem', py: '1rem', columnGap: '0.5rem', justifyContent: leftFooter ? 'space-between' : 'end' }}
            >
                {leftFooter}
                <Box>{children}</Box>
            </Box>
        </Box>
    )
}