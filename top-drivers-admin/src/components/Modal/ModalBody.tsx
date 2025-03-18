/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from "@mui/material";
import { useLayout } from "hooks/useLayout"
import { useCallback, useEffect, useMemo, useState } from "react";
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
    const modalHeightPercentage = useMemo(() => parseInt(heightModal) / 100, [heightModal]);

    const [height, setHeight] = useState<number>(0);
    const [maxHeight, setMaxHeight] = useState<number>(0);

    const onResize = useCallback(() => {
        const availableHeight = window.innerHeight - (heightActiveModalHeader + footerHeight);
        setHeight(window.innerHeight * modalHeightPercentage - (heightActiveModalHeader + footerHeight));
        setMaxHeight(availableHeight);
    }, [modalHeightPercentage, heightActiveModalHeader]);

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
            sx={{
                maxHeight,
                height,
                overflow: 'auto',
                px: { xs: 2, sm: 4 },
                py: { xs: 3, sm: 3 },
                width: isMobile ? '100%' : 'auto', // Evita desplazamientos horizontales innecesarios
                ...sx
            }}
        >
            {children}
        </Box>
    )
}