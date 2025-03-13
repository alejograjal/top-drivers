import { isEmpty } from "lodash"
import { useState } from "react"
import { useLayout } from "hooks/useLayout"
import { getNestedField } from "utils/util"
import { MobileDataTable } from "./MobileDataTable"
import { NoDataIndicador } from "components/NoDataIndicator/NoDataIndicador"
import { DataGrid, DataGridProps, GridRenderCellParams, GridSortModel, GridValidRowModel } from "@mui/x-data-grid"

export const DataTable = <RowModelT extends GridValidRowModel>({
    sortFieldName,
    sort,
    noDataMessage = 'No se encontró información',
    forceDesktopTableInMobile = false,
    emptyDataImageSource,
    ...props
}: DataGridProps<RowModelT> & {
    sortFieldName?: string
    sort?: 'asc' | 'desc'
    noDataMessage?: string
    forceDesktopTableInMobile?: boolean
    emptyDataImageSource?: string
}) => {
    const { isMobile } = useLayout()
    const {
        rows,
        columns,
        onRowClick,
        checkboxSelection,
        onRowSelectionModelChange,
        rowSelectionModel
    } = props

    const [sortModel, setSortModel] = useState<GridSortModel>([
        {
            field: sortFieldName ?? 'name',
            sort: sort ?? 'asc'
        }
    ])

    if (isEmpty(rows)) {
        return (
            <NoDataIndicador
                noDataMessage={noDataMessage}
                imageSource={emptyDataImageSource}
            />
        )
    }

    if (isMobile && !forceDesktopTableInMobile) {
        return (
            <MobileDataTable
                columns={columns}
                rows={rows}
                onRowClick={onRowClick}
                checkboxSelection={checkboxSelection}
                rowSelectionModel={rowSelectionModel}
                onRowSelectionModelChange={onRowSelectionModelChange}
            />
        )
    }

    const modifiedColumns = columns.map((col) => {
        if (!col.renderCell) {
            return {
                ...col,
                renderCell: (params: GridRenderCellParams<RowModelT>) => {
                    if (typeof col.field === 'string' && col.field.includes('.')) {
                        const value = getNestedField(params.row, col.field);
                        return value ?? 'No disponible';
                    }
                    return params.row[col.field];
                }
            };
        }

        return col;
    });


    return (
        <DataGrid<RowModelT>
            sx={{
                '& .MuiDataGrid-columnHeader': {
                    backgroundColor: '#4a6e6f',
                    color: 'white',
                },
                '& .MuiDataGrid-columnHeader:focus': {
                    outline: 'none'
                },
                '& .MuiDataGrid-columnHeader .MuiDataGrid-columnHeaderTitle': {
                    fontWeight: 'bolder',
                },
                '& .MuiDataGrid-row': {
                    cursor: 'pointer',
                    backgroundColor: '#e5e5e5',
                    color: 'black',
                },
                '& .MuiDataGrid-row:hover': {
                    backgroundColor: '#f0f0f0',
                }
            }}
            checkboxSelection={checkboxSelection}
            disableRowSelectionOnClick
            disableColumnMenu
            sortModel={sortModel}
            onSortModelChange={(model) => setSortModel(model)}
            initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 25 }
                }
            }}
            hideFooter={props.rows && props.rows.length <= 25}
            pageSizeOptions={[25, 50, 100]}
            {...props}
            columns={modifiedColumns}
        />
    )
}