import { isPresent } from "utils/util"
import CloseIcon from '@mui/icons-material/Close'
import { Box, SxProps, Theme, Typography } from "@mui/material"
import { RefObject, useCallback, useEffect, useRef } from "react"
import { useHeightActiveModalHeader } from "stores/useHeightActiveModalHeader"

const commonSxModalProps: SxProps<Theme> = {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
    borderBottom: '1px solid #fff',
    display: 'flex',
    px: { xs: 2, sm: 4 },
    py: { xs: 2, sm: 3 }
}

interface ModalHeaderProps {
    showIconClose?: boolean,
    toggleIsOpen: () => void,
    title?: string,
    subTitle?: string,
    secondSubTitle?: string
}

export const ModalHeader = ({
    showIconClose,
    toggleIsOpen,
    title,
    subTitle,
    secondSubTitle
}: ModalHeaderProps) => {
    const ref: RefObject<HTMLDivElement | null> = useRef(null);
    const setHeightModalHeader = useHeightActiveModalHeader((state) => state.setHeight)

    const onResize = useCallback(() => {
        if (ref.current) {
            setHeightModalHeader(ref.current.offsetHeight);
        }
    }, [setHeightModalHeader, ref])

    useEffect(() => {
        window.addEventListener('resize', onResize);
        onResize();
        return () => {
            window.removeEventListener('resize', onResize);
        }
    }, [onResize])

    return (
        <Box sx={commonSxModalProps} ref={ref}>
            <Box>
                {isPresent(title) && (
                    <Typography variant="h2" fontWeight='bold' sx={{ fontSize: { xs: "2rem", sm: "2.5rem" } }}>
                        {title}
                    </Typography>
                )}
                {isPresent(subTitle) && (
                    <Box>
                        <Typography variant="body1" sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }} >{subTitle}</Typography>
                        {isPresent(secondSubTitle) && (
                            <Typography variant="body2" sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}>{secondSubTitle}</Typography>
                        )}
                    </Box>
                )}
            </Box>
            <Box
                onClick={toggleIsOpen}
                sx={{
                    cursor: 'pointer',
                    ml: 'auto'
                }}
            >
                {isPresent(showIconClose) && <CloseIcon />}
            </Box>
        </Box>
    )
}