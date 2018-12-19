import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Table, TableColumn, TableColumnType } from "./components/table/table";
import dataStore from "./data-store";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="app-header">
          <img src={logo} className="logo" />
          <span className='title'>{"Contacts"}</span>
        </div>

        <Table
          data={dataStore.contacts}
          columns={this.getColumns()}
          saveRowData={dataStore.saveContact}
          deleteRowData={dataStore.deleteContact}
          editRowData={dataStore.editContact}
        />
      </div>
    );
  }

  getColumns(): TableColumn[] {
    return [
      {
        key: "firstName",
        header: "First Name",
        type: TableColumnType.Text,
        cellStyle: {
          width: 200
        }
      },

      {
        key: "lastName",
        header: "Last Name",
        type: TableColumnType.Text,
        cellStyle: {
          width: 200
        }
      },
      {
        key: "email",
        header: "Email",
        type: TableColumnType.ReadOnly,
        cellStyle: {
          width: 200
        }
      },
      {
        key: "phone",
        header: "Phone Number",
        type: TableColumnType.Text,
        cellStyle: {
          width: 200
        }
      },
      {
        key: "avatar",
        header: "Avatar",
        type: TableColumnType.Image,
        cellStyle: {
          width: 50,
          borderRadius: 30
        }
      }
    ];
  }
}

export default App;
