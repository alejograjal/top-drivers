import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { Home } from '../../pages/Home/Home';

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/"  element={<Home />} />
        </>
    )
)

export const Navigation = () => {
    return <RouterProvider router={router} />
}