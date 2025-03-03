import Cookies from 'js-cookie';
import { useLayout } from "hooks/useLayout";
import { useState, MouseEvent } from "react";
import { useAuth } from "contexts/AuthContext";
import { Avatar, Box, Divider, Menu, MenuItem, SxProps, Theme, Typography } from "@mui/material";

const commonSxMenuItemProps: SxProps<Theme> = {
    display: 'flex',
    justifyContent: 'end',
    padding: '12px'
}

export const ProfileContent = () => {
    const { isMobile } = useLayout();
    const { logout } = useAuth();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openMenu, setOpenMenu] = useState(false);
    const userName = Cookies.get('user_name');

    const handleAvatarClick = (event: MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
        setOpenMenu(true);
    };

    const handleCloseMenu = () => {
        setOpenMenu(false);
    };

    const handleLogout = () => {
        logout();
        handleCloseMenu();
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyItems: 'center', gap: '2', height: '100%' }}>
            {!isMobile && (<Typography variant='body2' sx={{ minWidth: '9rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>{userName ?? 'Usuario'}</Typography>)}
            <Avatar
                onClick={handleAvatarClick}
                sx={{ cursor: 'pointer' }}
            />
            <Menu
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleCloseMenu}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                sx={{
                    '& .MuiPaper-root': {
                        minWidth: '200px',
                        minHeight: '200px',
                    },
                    '& .MuiList-root': {
                        padding: 0
                    }
                }}
            >
                {isMobile && (
                    <>
                        <MenuItem sx={{ paddingBottom: '2rem', ...commonSxMenuItemProps }}>
                            <Typography variant='body2'>{userName ?? 'Usuario'}</Typography>
                        </MenuItem>
                        <Divider />
                    </>
                )}
                <MenuItem sx={commonSxMenuItemProps} onClick={handleLogout}>Cerrar sesión</MenuItem>
            </Menu>
        </Box>
    );
}