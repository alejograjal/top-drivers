import { useMediaQuery, useTheme } from "@mui/material";

export const useLayout = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return { isMobile };
}