import Cookies from 'js-cookie';
import { useEffect } from "react";
import { useAuth } from "contexts/AuthContext"
import { useSnackbar } from "stores/useSnackbar"
import { Navigate, useLocation, useOutlet } from "react-router-dom"

export const ProtectLayout = () => {
    const { isAuthenticated, refreshTokens, logout, authLoaded } = useAuth();
    const setSnackbarMessage = useSnackbar((state) => state.setMessage)
    const outlet = useOutlet();
    const location = useLocation();

    useEffect(() => {
        if (!authLoaded) return;

        const token = Cookies.get('access_token');
        const refreshToken = Cookies.get('refresh_token');

        if (!token || !refreshToken) {
            setSnackbarMessage(`Por favor inice sesión`, 'error');
            logout()
        } else {
            refreshTokens();
        }
    }, [location, isAuthenticated, refreshTokens, setSnackbarMessage, logout, authLoaded]);

    if (!authLoaded) {
        return null;
    }

    if (!isAuthenticated) {
        return <Navigate to="/" state={{ from: location }} />;
    }

    return outlet;
}