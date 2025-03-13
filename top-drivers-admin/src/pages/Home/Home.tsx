import { Stack } from "@mui/material"
import { Page } from "components/Shared/Page"
import ImageIcon from "@mui/icons-material/Image";
import { StatCard } from "components/Card/StatCard";
import SchoolIcon from "@mui/icons-material/School";
import { useGetImages } from "hooks/top-drivers/image/useGetImages";
import { useGetCourses } from "hooks/top-drivers/course/useGetCourses";

export const Home = () => {
    const { data: courses, isLoading: loadingCourses } = useGetCourses();
    const { data: images, isLoading: loadingImages } = useGetImages();

    return (
        <Page>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={3} justifyContent="center">
                <StatCard
                    title="Total de Cursos"
                    value={loadingCourses ? "..." : courses?.length || 0}
                    icon={<SchoolIcon fontSize="large" />}
                    color="#1976D2"
                />
                <StatCard
                    title="Total de Imágenes"
                    value={loadingImages ? "..." : images?.length || 0}
                    icon={<ImageIcon fontSize="large" />}
                    color="#D32F2F"
                />
            </Stack>
        </Page>
    )
}