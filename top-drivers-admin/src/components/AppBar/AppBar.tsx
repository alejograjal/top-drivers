import { MainContent } from "./MainContent"
import { useNavBar } from "stores/useNavBar"
import MenuIcon from '@mui/icons-material/Menu'
import { Box, IconButton, AppBar as MuiAppBar, Stack, Toolbar } from "@mui/material"

export const APP_BAR_HEIGHT = 65

export const AppBar = () => {
    const toggle = useNavBar((state) => state.toggle)
    return (
        <MuiAppBar position="fixed" sx={{ bgcolor: '#1b2c3f' }}>
            <Toolbar>
                <Box
                    display={{ xs: 'block', sm: 'block', md: 'block', lg: 'none' }}
                >
                    <IconButton
                        onClick={() => toggle()}
                    >
                        <MenuIcon sx={{ color: 'common.white' }} />
                    </IconButton>
                </Box>
                <Box
                    sx={{
                        display: {
                            xs: 'none',
                            sm: 'none',
                            md: 'block',
                            marginLeft: '5px'
                        }
                    }}
                >
                    IMG
                </Box>
                <Stack
                    direction='row'
                    spacing={2}
                    alignItems='center'
                    justifyContent='center'
                    justifyItems='center'
                >
                    <MainContent />
                </Stack>
            </Toolbar>
        </MuiAppBar>
    )
}