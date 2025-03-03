import { isPresent } from "utils/util"
import CloseIcon from '@mui/icons-material/Close'
import { Box, SxProps, Theme, Typography } from "@mui/material"
import { RefObject, useCallback, useEffect, useRef } from "react"
import { useHeightActiveModalHeader } from "stores/useHeightActiveModalHeader"

const commonSxModalProps: SxProps<Theme> = {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
    borderBottom: '1px solid #fff'
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
            <Box px={{ xs: 1, sm: 4 }} py={{ xs: 2, sm: 3 }} width="100%">
                {isPresent(title) && (
                    <Typography variant="h2" fontWeight='bold'>
                        {title}
                    </Typography>
                )}
                {isPresent(subTitle) && (
                    <Box>
                        <Typography variant="body1">{subTitle}</Typography>
                        {isPresent(secondSubTitle) && (
                            <Typography variant="body2">{secondSubTitle}</Typography>
                        )}
                    </Box>
                )}
            </Box>
            <Box
                onClick={toggleIsOpen}
                sx={{ cursor: 'pointer' }}
            >
                {isPresent(showIconClose) && <CloseIcon />}
            </Box>
        </Box>
    )
}