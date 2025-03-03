/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import { Content } from "./Content"
import { useLayout } from "hooks/useLayout"
import { useNavBar } from "stores/useNavBar"
import { APP_BAR_HEIGHT } from "../AppBar/AppBar"
import { Box, Divider, Drawer } from "@mui/material"
import { useSideNavCollapseStore } from "stores/useSideNavCollapseStore"

export const NAVIGATION_BAR_WIDTH = 265

export const NavigationBar = () => {
    const isOpen = useNavBar((state) => state.isOpen);
    const close = useNavBar((state) => state.close);
    const { isMobile } = useLayout();

    const setActiveTab = useSideNavCollapseStore((state) => state.setActiveTab);

    useEffect(() => {
        setActiveTab(location.pathname)
    }, [location.pathname, setActiveTab])

    if (isMobile) {
        return (
            <Drawer
                variant="temporary"
                PaperProps={{
                    sx: { top: 0 }
                }}
                sx={{
                    display: {
                        xs: 'block',
                        sm: 'block',
                        md: 'block',
                        lg: 'none'
                    },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: isMobile ? `${NAVIGATION_BAR_WIDTH * 1.3}px` : `${NAVIGATION_BAR_WIDTH}px`
                    }
                }}
                open={isOpen}
                onClose={close}
            >
                <Box mt={1} sx={{ ml: 2 }}>
                    IMG
                </Box>
                <Divider />
                <Content />

            </Drawer>
        )
    }

    return (
        <Drawer
            variant="permanent"
            PaperProps={{
                sx: { top: `${APP_BAR_HEIGHT}px` }
            }}
            sx={{
                '& .MuiDrawer-paper': {
                    boxSizing: 'border-box',
                    width: `${NAVIGATION_BAR_WIDTH}px`,
                    height: `calc(100% - ${APP_BAR_HEIGHT}px)`,
                }
            }}
            open
        >
            <Content />
        </Drawer>
    )
}