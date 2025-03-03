import { useNavigate } from "react-router-dom"
import { Course } from "types/api-basereservation"
import { DataTable } from "components/Table/DataTable"
import { ErrorProcess } from "components/Error/ErrorProcess"
import { useGetCourses } from "hooks/top-drivers/course/useGetCourses"
import { CircularLoadingProgress } from "components/LoadingProgress/CircularLoadingProcess"
import { GridColDef, GridEventListener, GridRenderCellParams, GridRowParams } from "@mui/x-data-grid"

export const CourseTable = () => {
    const navigate = useNavigate()
    const { data, isPending, isError } = useGetCourses();

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'Id',
            minWidth: 20,
        },
        {
            field: 'name',
            headerName: 'Nombre',
            minWidth: 300,
        },
        {
            field: 'description',
            headerName: 'Descripción',
            minWidth: 800,
            flex: 1
        },
        {
            field: 'duration',
            headerName: 'Duración horas',
            minWidth: 180,
            align: 'right'
        },
        {
            field: '',
            headerName: 'Visible',
            minWidth: 100,
            renderCell: (params: GridRenderCellParams<Course>) => {
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
        navigate(`/Curso/${params.id}`)
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