import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { CourseTable } from "./CourseTable";
import { Page } from "components/Shared/Page";
import AddIcon from "@mui/icons-material/Add";
import { PageHeader } from "components/Shared/PageHeader";

export const Course = () => {
    return (
        <Page
            header={
                <PageHeader title="Cursos" actionButton={
                    <Link to="/Curso/Nuevo">
                        <Button variant="contained" size="large" fullWidth startIcon={<AddIcon />} >Crear Curso</Button>
                    </Link>
                } />
            }
        >
            <CourseTable />
        </Page>
    )
}