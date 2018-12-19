import React, { Component } from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";
import {
  getDeleteButton,
  getEditButton,
  getAddButton,
  getCancelButton,
  getCopyButton,
  getCheckButton,
  getLabeledButton
} from "./buttons-helper";

import { TableColumn, TableColumnType } from "../table";

import "./table-row.css";

export enum RowState {
  Info,
  New,
  Edit,
  AddNew,
  ConfirmDelete
}

export interface TableRowProps<T> {
  data: T;
  columns: TableColumn[];
  deleteAction?: (rowData: any) => void;
  saveAction?: (rowData: any) => void;
  editAction?: (rowData: any) => void;
  state: RowState;
}

@observer
export class TableRow<T> extends Component<TableRowProps<T>> {
  @observable rowState = RowState.Info;
  @observable rowData: T = {} as T;
  undoEditTemp: T = {} as T;

  constructor(props: TableRowProps<T>) {
    super(props);
    this.rowState = props.state;
  }

  render() {
    const { data, columns } = this.props;
    switch (this.rowState) {
      case RowState.Info:
        return this.getInfoRow(data, columns);
      case RowState.AddNew:
        return this.getAddNewRow(columns);
      case RowState.New:
        return this.getNewRow(columns);
      case RowState.ConfirmDelete:
        return this.getConfirmDeleteRow(data);
      case RowState.Edit:
        return this.getEditRow(this.rowData, columns);
    }
  }

  private getInfoRow(data: T, columns: TableColumn[]) {
    return (
      <div className="row">
        {Object.keys(data).map(key => {
          const column = columns.find(col => col.key === key);
          const cellStyle = column && column.cellStyle;
          switch (column && column.type) {
            case TableColumnType.Text:
            case TableColumnType.ReadOnly:
              return (
                <span key={key} className="cell" style={cellStyle}>
                  {(data as any)[key]}
                </span>
              );
            case TableColumnType.Image:
              return (
                <img
                  key={key}
                  className="cell"
                  style={cellStyle}
                  src={(data as any)[key]}
                />
              );
          }
        })}

        <div className="action-buttons">
          {getDeleteButton(() => this.setRowState(RowState.ConfirmDelete))}
          {getEditButton(() => this.setRowState(RowState.Edit))}
          {getCopyButton(() => {})}
        </div>
      </div>
    );
  }

  private getConfirmDeleteRow(data: T) {
    return (
      <div className="row">
        Are you sure you want to delete this contact?
        {getLabeledButton("Yes", () => {
          if (this.props.deleteAction) this.props.deleteAction(data);
        })}
        {getLabeledButton("No", () => this.setRowState(RowState.Info))}
      </div>
    );
  }

  private getAddNewRow(columns: TableColumn[]) {
    return (
      <div className="row">
        {columns.map(column => {
          const cellStyle = column && column.cellStyle;
          return <span key={column.key} className="cell" style={cellStyle} />;
        })}
        <div className="action-buttons">
          {getAddButton(() => this.setRowState(RowState.New))}
        </div>
      </div>
    );
  }

  private getNewRow(columns: TableColumn[]) {
    return (
      <div className="row">
        {columns.map(column => {
          if (column.type === TableColumnType.Image)
            return (
              <div
                key={column.key}
                style={column.cellStyle}
                className="cell edit"
              />
            );

          return (
            <input
              key={column.key}
              style={column.cellStyle}
              className="cell edit"
              type="text"
              value={(this.rowData as any)[column.key] || ""}
              placeholder={column.header}
              onChange={this.onPropertyEdited(column.key)}
            />
          );
        })}
        <div className="action-buttons">
          {getCheckButton(() => {
            if (this.props.saveAction) this.props.saveAction(this.rowData);
            this.rowData = {} as T;
            this.setRowState(RowState.AddNew);
          })}
        </div>
      </div>
    );
  }

  @action
  private getEditRow(data: T, columns: TableColumn[]) {
    this.undoEditTemp = Object.assign({}, data);
    return (
      <div className="row">
        {columns.map(column => {
          const cellStyle = column.cellStyle;
          switch (column.type) {
            case TableColumnType.Text:
              return (
                <input
                  key={column.key}
                  style={column.cellStyle}
                  className="cell"
                  type="text"
                  value={(this.rowData as any)[column.key] || ""}
                  onChange={this.onPropertyEdited(column.key)}
                />
              );

            case TableColumnType.ReadOnly:
              return (
                <span key={column.key} className="cell" style={cellStyle}>
                  {(this.rowData as any)[column.key]}
                </span>
              );

            case TableColumnType.Image:
              return (
                <img
                  key={column.key}
                  className="cell"
                  style={cellStyle}
                  src={(this.rowData as any)[column.key]}
                />
              );
          }
        })}
        <div className="action-buttons">
          {getCheckButton(() => {
            if (this.props.editAction) this.props.editAction(this.rowData);
            this.rowData = {} as T;
          })}
          {getCancelButton(() => this.cancelEdit())}
        </div>
      </div>
    );
  }

  @action
  private cancelEdit() {
    this.rowData = this.undoEditTemp;
    this.setRowState(RowState.Info);
  }

  @action
  private setRowState(state: RowState) {
    this.rowState = state;
  }

  @action
  onPropertyEdited = (key: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    (this.rowData as any)[key] = event.target.value;
  };
}
