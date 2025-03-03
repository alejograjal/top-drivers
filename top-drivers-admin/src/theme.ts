import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    typography: {
        fontFamily: `'Satoshi', sans-serif`,
        h1: {
            fontFamily: `'Satoshi', serif`,
            fontSize: '7rem', // Equivalent to --h1-font-size
        },
        h2: {
            fontFamily: `'Satoshi', serif`,
            fontSize: '4rem', // Equivalent to --h2-font-size
        },
        h3: {
            fontFamily: `'Satoshi', serif`,
            fontSize: '2rem', // Equivalent to --h3-font-size
        },
        h4: {
            fontFamily: `'Satoshi', serif`,
            fontSize: '1.5rem', // Equivalent to --h4-font-size
        },
        body1: {
            fontFamily: `'Satoshi', sans-serif`,
            fontSize: '1.25rem', // Equivalent to --normal-font-size
        },
        body2: {
            fontFamily: `'Satoshi', sans-serif`,
            fontSize: '1.125rem', // Equivalent to --small-font-size
            fontWeight: 'bold'
        },
        subtitle1: {
            fontFamily: `'Satoshi', sans-serif`,
            fontSize: '1.25rem', // Equivalent to --h3-font-size
        },
        subtitle2: {
            fontFamily: `'Satoshi', sans-serif`,
            fontSize: '1rem',
            color: 'grey'
        },
        fontWeightMedium: 500, // Equivalent to --font-medium
        fontWeightRegular: 600, // Equivalent to --font-semi-bold
    },
    palette: {
        common: {
            white: '#fff',
        },
        primary: {
            main: '#1b2c3f',
        },
        secondary: {
            main: '#ff4081',
        },
        background: {
            default: '#fff',
            paper: '#FFF4EB',
        },
        text: {
            primary: '#000',
            secondary: '#80838b',
        }
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {

                },
            },
        },
        MuiToolbar: {
            styleOverrides: {
                root: {
                    justifyContent: 'space-between'
                }
            }
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#fff',
                }
            }
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: '#E1E1E1',
                    },
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    width: '70%',
                    maxWidth: '70%',
                    overflow: 'hidden',
                    background: '#1b2c3f',
                    color: '#8590a5'
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                containedPrimary: {
                    backgroundColor: '#3c5c5b',
                    height: '3rem',
                    color: '#fff',
                    fontWeight: 'bold',
                    '&:hover': {
                        backgroundColor: '#5a7f7f'
                    }
                },
                outlinedPrimary: {
                    height: '3rem',
                    color: '#000',
                    borderColor: '#000',
                    fontWeight: 'bold',
                    '&:hover': {
                        backgroundColor: '#b3aea6'
                    }
                }
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#3c5c5b',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#3c5c5b',
                    },
                },
                input: {
                    fontSize: '1rem',
                },
                inputSizeSmall: {
                    fontSize: '0.75rem',
                },
            },
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    fontSize: '1.25rem', // Adjust the font size as needed
                    '&.Mui-focused': {
                        color: '#3c5c5b',
                        fontSize: '1.25rem',
                    },
                },
            },
        },
        MuiFormControlLabel: {
            styleOverrides: {
                label: {
                    color: 'inherit',
                    '&.Mui-disabled': {
                        color: 'inherit',
                    },
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                icon: {
                    color: '#3c5c5b',
                },
            },
        },
    },
});
