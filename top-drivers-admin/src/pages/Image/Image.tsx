import { Button } from "@mui/material"
import { Link } from "react-router-dom"
import { Page } from "components/Shared/Page"
import AddIcon from "@mui/icons-material/Add";
import { PageHeader } from "components/Shared/PageHeader"
import { ImageTable } from "./ImageTable";

export const Image = () => {
    return (
        <Page
            header={
                <PageHeader title="Imágenes" actionButton={
                    <Link to="/Imagen/Nueva">
                        <Button variant="contained" size="large" fullWidth startIcon={<AddIcon />} >Agregar imagen</Button>
                    </Link>
                } />
            }
        >
            <ImageTable />
        </Page>
    )
}