import { Home } from "pages/Home/Home";
import { Route } from "react-router-dom";
import { Course } from "pages/Course/Course";
import { CourseNewEditWrapper } from "pages/Course/CourseNewEditWrapper";
import { Image } from "pages/Image/Image";

export const routesProtected = [
    {
        name: 'Inicio',
        path: '/Inicio',
        element: <Home />
    },
    {
        name: 'Curso',
        path: '/Curso',
        element: <Course />
    },
    {
        name: 'CrearCurso',
        path: '/Curso/Nuevo',
        element: <CourseNewEditWrapper />
    },
    {
        name: 'EditarCurso',
        path: '/Curso/:courseId',
        element: <CourseNewEditWrapper />
    },
    {
        name: 'Imagen',
        path: '/Imagen',
        element: <Image />
    }
]

export const getProtectedRoutes = () =>
    routesProtected.map((route) => (
        <Route path={route.path} key={route.path} element={route.element} />
    ))