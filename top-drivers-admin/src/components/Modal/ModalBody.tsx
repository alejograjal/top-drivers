/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from "@mui/material";
import { useLayout } from "hooks/useLayout"
import { useEffect, useState } from "react";
import { useHeightActiveModalHeader } from "stores/useHeightActiveModalHeader";

interface ModalBodyProps {
    children: React.ReactNode,
    heightModal: string,
    sx?: React.CSSProperties
}

export const ModalBody = ({
    children,
    heightModal,
    sx
}: ModalBodyProps) => {
    const { isMobile } = useLayout();
    const heightActiveModalHeader = useHeightActiveModalHeader((state) => state.height)

    const footerHeight = 80;
    const [height, setHeight] = useState<number>();
    const [maxHeight, setMaxHeight] = useState<number>();

    const onResize = () => {
        setHeight(
            window.innerHeight * (parseInt(heightModal) / 100) - (heightActiveModalHeader + footerHeight)
        );
        setMaxHeight(window.innerHeight - (heightActiveModalHeader + footerHeight));
    }

    useEffect(() => {
        window.addEventListener('resize', onResize);
        onResize();
        return () => {
            window.removeEventListener('resize', onResize);
        }
    }, [heightActiveModalHeader])

    return (
        <Box
            component='div'
            maxHeight={maxHeight}
            height={height}
            overflow={'auto'}
            px={{ xs: 2, sm: 4 }}
            py={{ xs: 3, sm: 3 }}
            sx={{
                ...(isMobile ? { width: '108vw' } : {}),
                ...sx
            }}
        >
            {children}
        </Box>
    )
}