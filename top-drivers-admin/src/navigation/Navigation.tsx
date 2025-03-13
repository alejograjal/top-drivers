import { LoginPage } from 'pages/Login/LoginPage';
import { ProtectLayout } from './ProtectedLayout';
import { getProtectedRoutes } from './ProtectedNavigation';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<LoginPage />} />
            <Route element={<ProtectLayout />}>
                {getProtectedRoutes()}
            </Route>
        </>
    )
)

export const Navigation = () => {
    return <RouterProvider router={router} />
};
