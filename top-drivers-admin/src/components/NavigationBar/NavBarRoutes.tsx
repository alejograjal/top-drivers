import { has } from 'lodash';
import HomeIcon from '@mui/icons-material/Home'
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import { type NavBarRouteDef, type NavBarDefWithChildren } from 'types/nav'

export const isChildrenRouteDef = (
    x: NavBarRouteDef
): x is NavBarDefWithChildren => {
    return has(x, 'childrenRoutes')
}

export const NavBarRoutes: Record<string, NavBarRouteDef> = {
    Inicio: {
        path: '/Inicio',
        icon: (
            <HomeIcon />
        ),
    },
    Cursos: {
        path: '/Curso',
        icon: (
            <HolidayVillageIcon />
        ),
    },
    Imagenes: {
        path: '/Imagen',
        icon: (
            <AutoAwesomeMotionIcon />
        ),
    }
}