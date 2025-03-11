import { useNavigate } from "react-router-dom";
import { Image } from "types/api-basereservation";
import { DataTable } from "components/Table/DataTable"
import { ErrorProcess } from "components/Error/ErrorProcess";
import { useGetImages } from "hooks/top-drivers/image/useGetImages";
import { CircularLoadingProgress } from "components/LoadingProgress/CircularLoadingProcess";
import { GridColDef, GridEventListener, GridRenderCellParams, GridRowParams } from "@mui/x-data-grid";

export const ImageTable = () => {
    const navigate = useNavigate()
    const { data, isPending, isError } = useGetImages();

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'Id',
            minWidth: 20,
        },
        {
            field: 'name',
            headerName: 'Nombre',
            minWidth: 150,
        },
        {
            field: 'description',
            headerName: 'Descripción',
            minWidth: 800,
            flex: 1
        },
        {
            field: '',
            headerName: 'Visible',
            minWidth: 100,
            renderCell: (params: GridRenderCellParams<Image>) => {
                return (params.row.isEnabled ? 'Sí' : 'No')
            }
        }
    ]

    if (isPending) {
        return <CircularLoadingProgress />
    }

    if (isError) {
        return <ErrorProcess />
    }

    const selectRow: GridEventListener<'rowClick'> = (params: GridRowParams) => {
        navigate(`/Imagen/${params.id}`)
    }

    return (
        <DataTable
            sortFieldName="id"
            sort="desc"
            columns={columns}
            rows={data}
            onRowClick={selectRow}
        />
    )
}