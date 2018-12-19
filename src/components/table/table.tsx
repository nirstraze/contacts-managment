import React, { Component } from "react";
import { observer } from "mobx-react";
import { RowState, TableRow } from "../table-row/table-row";

export enum TableColumnType {
  Text,
  ReadOnly,
  Image
}

export interface TableColumn {
  key: string;
  header: string;
  type: TableColumnType;
  cellStyle: React.CSSProperties;
}

export interface TableProps<T> {
  data: T[];
  columns: TableColumn[];
  saveRowData: (rowData: T) => void;
  deleteRowData: (item: T) => void;
  editRowData: (item: T) => void;
}

export interface TableHeaderProps {
  columns: TableColumn[];
}

@observer
export class Table<T> extends Component<TableProps<T>> {
  render() {
    const { data, columns, deleteRowData, editRowData } = this.props;
    return (
      <div>
        <TableHeader columns={columns} />
        {data.map((item, i) => (
          <TableRow
            key={i}
            data={item}
            deleteAction={() => deleteRowData(item)}
            editAction={() => editRowData(item)}
            columns={columns}
            state={RowState.Info}
          />
        ))}
        <TableRow
          key={"add-new"}
          columns={columns}
          saveAction={this.props.saveRowData}
          data={{}}
          state={RowState.AddNew}
        />
      </div>
    );
  }
}

const TableHeader = (props: TableHeaderProps) => {
  return (
    <div className="row header">
      {props.columns.map(column => (
        <div key={column.key} className="cell" style={column.cellStyle}>
          {column.header}
        </div>
      ))}
    </div>
  );
};
