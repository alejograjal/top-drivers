import {
    type GridValidRowModel,
    type MuiEvent,
    type DataGridProps,
    GridColType,
    GridColDef,
} from '@mui/x-data-grid'
import { MutableRefObject } from 'react'
import { compact, isNil, reject } from 'lodash'
import { isPresent, convertToArray } from 'utils/util'
import { type GridApiCommunity } from '@mui/x-data-grid/internals'
import { Box, Checkbox, Divider, Typography } from '@mui/material'

const handleCheckBoxOnClick = <RowModelT extends GridValidRowModel>(
    rowSelectionModel: DataGridProps<RowModelT>['rowSelectionModel'],
    row: RowModelT,
    onRowSelectionModelChange?: DataGridProps<RowModelT>['onRowSelectionModelChange']
) => {
    const api = {} as GridApiCommunity

    if (isNil(onRowSelectionModelChange)) {
        return
    }

    const model = convertToArray(rowSelectionModel);

    if (model.includes(row.id)) {
        onRowSelectionModelChange(compact(reject(model, (id) => id === row.id)), { api })
        return
    }

    onRowSelectionModelChange([...model, row.id], { api });
}

const isCheckboxSelectionColumn = (type: GridColType | undefined): boolean => {
    return type === 'checkboxSelection' as GridColType;
};

const MobileRow = <RowModelT extends GridValidRowModel>({
    row,
    columns,
    checkboxSelection,
    rowSelectionModel,
    onRowSelectionModelChange,
}: Pick<
    DataGridProps<RowModelT>,
    | 'columns'
    | 'checkboxSelection'
    | 'rowSelectionModel'
    | 'onRowSelectionModelChange'
> & { row: RowModelT }) => {
    const api = {} as MutableRefObject<GridApiCommunity>

    return (
        <Box className="flex flex-row items-center justify-between">
            <div>
                {columns.map((col, index) => {
                    if (isCheckboxSelectionColumn(col.type)) {
                        return null;
                    }

                    const { field, valueGetter, valueFormatter } = col;
                    const variant = index === 0 ? 'subtitle1' : 'body1';
                    const color = index !== 0 ? '#292B2699' : '#2C2C27';

                    const valueRow = ((): string => {
                        if (isPresent(valueFormatter)) {
                            return valueFormatter(
                                row[field] as unknown as never,
                                row,
                                col,
                                api
                            );
                        }

                        if (isPresent(valueGetter)) {
                            return valueGetter(
                                row[field] as unknown as never,
                                row,
                                col,
                                api,
                            );
                        }

                        return row[field as keyof RowModelT];
                    })();

                    return (
                        <Typography
                            variant={variant}
                            color={color}
                            key={`${String(row.id)}-${String(col.field)}`}
                        >
                            {valueRow}
                        </Typography>
                    );
                })}
            </div>
            {checkboxSelection && (
                <Checkbox
                    checked={convertToArray(rowSelectionModel).includes(row.id)}
                    onClick={() =>
                        handleCheckBoxOnClick(
                            rowSelectionModel ?? [],
                            row,
                            onRowSelectionModelChange
                        )
                    }
                />
            )}
        </Box>
    );
};

export const MobileDataTable = <RowModelT extends GridValidRowModel>({
    columns,
    rows,
    onRowClick,
    checkboxSelection,
    rowSelectionModel,
    onRowSelectionModelChange,
}: DataGridProps<RowModelT>) => {
    const headerName = checkboxSelection
        ? columns.find((col) => col.type === 'checkboxSelection' as GridColType)?.headerName
        : ''
    const api = {} as GridApiCommunity

    return (
        <Box
            border={checkboxSelection ? '1px solid rgba(41, 43, 38, 0.10)' : ''}
            borderBottom={0}
            borderRadius="4px"
        >
            {checkboxSelection && (
                <Box
                    paddingX={2}
                    paddingY={3}
                    bgcolor={'red'} // TODO: change this
                    borderBottom="1px solid rgba(41, 43, 38, 0.10)"
                >
                    <Typography variant="h3">{headerName}</Typography>
                </Box>
            )}
            {rows?.map((row) => (
                <Box
                    key={row.id}
                    bgcolor={
                        convertToArray(rowSelectionModel).includes(row.id)
                            ? 'rgba(204, 32, 39, 0.08)'
                            : 'white'
                    }
                >
                    <Box
                        padding={2}
                        onClick={(
                            event: MuiEvent<React.MouseEvent<HTMLElement, MouseEvent>>
                        ) => {
                            if (checkboxSelection) {
                                handleCheckBoxOnClick(
                                    rowSelectionModel,
                                    row,
                                    onRowSelectionModelChange
                                )
                            } else if (!isNil(onRowClick)) {
                                onRowClick({ row, id: row.id, columns: columns as GridColDef<RowModelT>[] }, event, { api })
                            }
                        }}
                    >
                        <MobileRow
                            key={`${String(row.id)}-row`}
                            row={row}
                            columns={columns}
                            checkboxSelection={checkboxSelection}
                            rowSelectionModel={checkboxSelection ? rowSelectionModel : []}
                            onRowSelectionModelChange={onRowSelectionModelChange}
                        />
                    </Box>
                    <Divider />
                </Box>
            ))}
        </Box>
    )
}
