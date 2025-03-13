import { map, startsWith } from "lodash";
import { useLayout } from "hooks/useLayout"
import { useNavigate } from "react-router-dom";
import ChevronDown from 'assets/chevron-down.svg'
import { NAVIGATION_BAR_WIDTH } from "./NavigationBar";
import { isChildrenRouteDef, NavBarRoutes } from "./NavBarRoutes";
import { SnackbarState, useSideNavCollapseStore } from "stores/useSideNavCollapseStore";
import { Box, Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material"

export const Content = () => {
    const { isMobile } = useLayout();
    const navigate = useNavigate();
    const openCollapse = useSideNavCollapseStore((state) => state)
    const setOpenCollapse = useSideNavCollapseStore((state) => state.setOpen)

    const checkLocation = (routes: string[]): boolean => {
        for (const route of routes) {
            if (startsWith(location.pathname, route)) {
                return true;
            }
        }
        return false;
    }

    return (
        <List
            sx={{
                ml: isMobile ? -0.8 : 0,
                flex: 1,
                width: isMobile
                    ? `${NAVIGATION_BAR_WIDTH * 1.35}px`
                    : `${NAVIGATION_BAR_WIDTH}px`,
                borderRightWidth: 1,
            }}
        >
            {map(NavBarRoutes, (routeDef, key) => {
                if (isChildrenRouteDef(routeDef)) {
                    const parent = `/${key}`;
                    return (
                        <Box key={`children-routes-box-${key}`}>
                            <ListItem
                                sx={{ px: 1, py: 0.5 }}
                                key={`children-routes-listitem-${key}`}
                            >
                                <ListItemButton
                                    key={`children-routes-button-${key}`}
                                    onClick={() => setOpenCollapse(key)}
                                    sx={{
                                        '&.Mui-selected': {
                                            color: '#d7e4ec'
                                        }
                                    }}
                                    selected={
                                        startsWith(location.pathname, parent)
                                    }
                                >
                                    <ListItemIcon
                                        key={`children-routes-icon-${key}`}
                                        sx={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            color: `${startsWith(location.pathname, parent) ? '#d7e4ec' : '#8590a5'}`
                                        }}
                                    >
                                        {routeDef.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        key={`children- routes - text - ${key}`}
                                        primary={<Typography variant="body2">{key}</Typography>}
                                    />
                                    <img
                                        alt="display-item"
                                        src={ChevronDown}
                                        className={
                                            openCollapse[key as keyof SnackbarState]
                                                ? 'rotate-180'
                                                : '' + 'pl-2'
                                        }
                                        key={`children-routes-img-${key}`}
                                    />
                                </ListItemButton>
                            </ListItem>
                            <Collapse
                                in={openCollapse[key as keyof SnackbarState] as unknown as boolean}
                                timeout={'auto'}
                                unmountOnExit
                                key={`children-routes-collapse-${key}`}
                            >
                                <List
                                    component="div"
                                    disablePadding
                                    key={`children-routes-collapse-list-${key}`}
                                >
                                    {map(routeDef.childrenRoutes, (childRoute) => {
                                        return (
                                            <ListItem
                                                sx={{
                                                    px: 1, py: 0.5,
                                                    '&:hover': {
                                                        '& .MuiListItemText-root': {
                                                            color: '#d7e4ec',
                                                        },
                                                        '& .MuiListItemIcon-root': {
                                                            color: '#d7e4ec',
                                                        }
                                                    }
                                                }}
                                                key={`children-routes-listitem2-${childRoute.path}`}
                                            >
                                                <ListItemButton
                                                    key={`children-routes-listbutton-${childRoute.path}`}
                                                    onClick={() => {
                                                        navigate(childRoute.path)
                                                    }}
                                                    sx={{
                                                        '&.Mui-selected': {
                                                            color: '#d7e4ec'
                                                        }
                                                    }}
                                                    selected={
                                                        startsWith(location.pathname, childRoute.path) || checkLocation(childRoute.associatedPageUrls)
                                                    }
                                                >
                                                    <ListItemIcon
                                                        key={`children-routes-icon-${childRoute.path}`}
                                                        sx={{
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            color: `${startsWith(location.pathname, childRoute.path) ? '#d7e4ec' : '#8590a5'}`
                                                        }}
                                                    />
                                                    <ListItemText
                                                        key={`children-routes-listtext-${childRoute.path}`}
                                                        sx={{ px: 0.25 }}
                                                        primary={
                                                            <Typography>
                                                                {childRoute.title}
                                                            </Typography>
                                                        }
                                                    />
                                                </ListItemButton>
                                            </ListItem>
                                        )
                                    })}
                                </List>
                            </Collapse>
                        </Box>
                    )
                } else {
                    return (
                        <ListItem
                            sx={{
                                px: 1, py: 0.5,
                                '&:hover': {
                                    '& .MuiListItemText-root': {
                                        color: '#d7e4ec',
                                    },
                                    '& .MuiListItemIcon-root': {
                                        color: '#d7e4ec',
                                    }
                                }
                            }}
                            key={`listitem-standard-routes-listitem-${key}`}
                        >
                            <ListItemButton
                                key={`listitem-standard-routes-button-${key}`}
                                onClick={() => {
                                    navigate(routeDef.path);
                                }}
                                sx={{
                                    '&.Mui-selected': {
                                        color: '#d7e4ec',
                                        backgroundColor: 'transparent'
                                    },
                                }}
                                selected={startsWith(location.pathname, routeDef.path)}
                            >
                                <ListItemIcon
                                    key={`listitem-standard-routes-icon-${key}`}
                                    sx={{
                                        justifyContent: 'center', alignItems: 'center', color: `${startsWith(location.pathname, routeDef.path) ? '#d7e4ec' : '#8590a5'}`,
                                    }}
                                >
                                    {routeDef.icon}
                                </ListItemIcon>
                                <ListItemText
                                    key={`listitem-standard-routes-text-${key}`}
                                    primary={
                                        <Typography>{key}</Typography>
                                    }
                                />
                            </ListItemButton>

                        </ListItem>
                    )
                }
            })}
        </List>
    )
}