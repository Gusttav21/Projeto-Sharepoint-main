import * as React from 'react';

  import {
    
    DataGridBody,
    DataGridRow,
    DataGrid,
    DataGridHeader,
    DataGridHeaderCell,
    DataGridCell,
    TableCellLayout,
    TableColumnDefinition,
    createTableColumn,
    DataGridProps,
  } from "@fluentui/react-components";
import { IReceitas } from '../../../../../interfaces/IReceitas';
import { stringIsNullOrEmpty } from '@pnp/pnpjs';
import { ITableProps } from './ITableProps';

const Table:React.FunctionComponent <ITableProps> = (props) => {

    const columns: TableColumnDefinition<IReceitas>[] = [
        createTableColumn<IReceitas>({
          columnId: "Title",
          compare: (a, b) => {
            return a.Title.localeCompare(b.Title);
          },
          renderHeaderCell: () => {
            return "Receitas";
          },
          renderCell: (item) => {
            return (
              <TableCellLayout>
                {item.Title}
              </TableCellLayout>
            );
          },
        }),
        createTableColumn<IReceitas>({
            columnId: "TipoReceita",
            compare: (a, b) => {
              return a.TipoReceita!.localeCompare(b.TipoReceita!);
            },
            renderHeaderCell: () => {
              return "Tipo de Receita";
            },
            renderCell: (item) => {
              return (
                <TableCellLayout>
                  {item.TipoReceita}
                </TableCellLayout>
              );
            },
          }),
          createTableColumn<IReceitas>({
            columnId: "Cara",
            compare: (a, b) => {
              return transformaBoolparaString(a.Cara!).localeCompare(transformaBoolparaString(b.Cara!));
            },
            renderHeaderCell: () => {
              return "Cara";
            },
            renderCell: (item) => {
              return (
                <TableCellLayout>
                  {transformaBoolparaString(item.Cara!)}
                </TableCellLayout>
              );
            },
          }),
          createTableColumn<IReceitas>({
            columnId: "DataTentativa",
            compare: (a, b) => {
              return transformaStringParaData(a.DataTentativaString!).localeCompare(transformaStringParaData(b.DataTentativaString!));
            },
            renderHeaderCell: () => {
              return "Data";
            },
            renderCell: (item) => {
              return (
                <TableCellLayout>
                  {transformaStringParaData(item.DataTentativaString!)}
                </TableCellLayout>
              );
            },
          }),
      ];
      function transformaStringParaData(date:string):string{
        if(!stringIsNullOrEmpty(date)){
            const data = new Date(date);
            const dataFormatada = data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear();

            return dataFormatada;
        }
        return "";
      }
      function transformaBoolparaString(bool:boolean):string {
        if(bool){
            return "true";
        }
        return "false";
      }
      
      const [sortState, setSortState] = React.useState<
      Parameters<NonNullable<DataGridProps["onSortChange"]>>[1]
    >({
      sortColumn: "file",
      sortDirection: "ascending",
    });
    const onSortChange: DataGridProps["onSortChange"] = (e, nextSortState) => {
      setSortState(nextSortState);
    };
  
    return (
      <DataGrid
        items={props.item}
            columns={columns}
            sortable
            sortState={sortState}
            onSortChange={onSortChange}
      >
        <DataGridHeader>
          <DataGridRow>
            {({ renderHeaderCell }) => (
              <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
            )}
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody<IReceitas>>
          {({ item, rowId }) => (
            <DataGridRow<IReceitas> key={rowId}>
              {({ renderCell }) => (
                <DataGridCell>{renderCell(item)}</DataGridCell>
              )}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>
    );
  };
 

export default Table