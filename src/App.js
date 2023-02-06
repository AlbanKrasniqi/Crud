import React, { useState, useEffect } from "react";
import "./App.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { Grid, Button } from "@material-ui/core";
import FormDialog from "./components/dialog";

const initialValue = { name: "", email: "", phone: "", dob: "" };
function App() {
  const [gridApi, setGridApi] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState(initialValue);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData(initialValue);
  };
  const url = `http://localhost:4000/users`;
  const columnDefs = [
    { headerName: "Name", field: "name" },
    { headerName: "Last Name", field: "lastName" },
    { headerName: "Adress", field: "adress" },
    { headerName: "City", field: "city" },
    { headerName: "Country", field: "country" },
    { headerName: "Email", field: "email" },

    { headerName: "Number", field: "phoneNum" },
    {
      headerName: "Edit",
      field: "id",
      cellRendererFramework: (params) => (
        <div className="editBtn">
          <Button className="editBtn" onClick={() => handleUpdate(params.data)}>
            Edit
          </Button>
        </div>
      ),
    },
    {
      headerName: "Delete",
      field: "id",
      cellRendererFramework: (params) => (
        <div className="deleteBtn">
          <Button onClick={() => handleDelete(params.value)}>Delete</Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    fetch(url)
      .then((resp) => resp.json())
      .then((resp) => setTableData(resp));
  };
  const onChange = (e) => {
    const { value, id } = e.target;

    setFormData({ ...formData, [id]: value });
  };
  const onGridReady = (params) => {
    setGridApi(params);
  };

  const handleUpdate = (oldData) => {
    setFormData(oldData);
    handleClickOpen();
  };

  const handleDelete = (id) => {
    const confirm = window.confirm(
      "Are you sure, you want to delete this row",
      id
    );
    if (confirm) {
      fetch(url + `/${id}`, { method: "DELETE" })
        .then((resp) => resp.json())
        .then((resp) => getUsers());
    }
  };
  const handleFormSubmit = () => {
    if (formData.id) {
      const confirm = window.confirm(
        "Are you sure, you want to update this row ?"
      );
      confirm &&
        fetch(url + `/${formData.id}`, {
          method: "PUT",
          body: JSON.stringify(formData),
          headers: {
            "content-type": "application/json",
          },
        })
          .then((resp) => resp.json())
          .then((resp) => {
            handleClose();
            getUsers();
          });
    } else {
      fetch(url, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((resp) => {
          handleClose();
          getUsers();
        });
    }
  };

  const defaultColDef = {
    sortable: true,
    flex: 1,
    resizable: true,
    filter: true,
    floatingFilter: true,
  };

  return (
    <div className="App">
      <div className="pBox">
        <h3>PhoneCall</h3>
      </div>
      <Grid align="right">
        <div className="UpperTittle" style={{ padding: "20px" }}>
          <h3>Contacts</h3>
          <Button className="AddBtn" onClick={handleClickOpen}>
            Add Contact
          </Button>
        </div>
      </Grid>
      <div className="ag-theme-alpine table ">
        <div className="table-grid">
          <AgGridReact
            rowData={tableData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
          />
        </div>
      </div>

      <FormDialog
        open={open}
        handleClose={handleClose}
        data={formData}
        onChange={onChange}
        handleFormSubmit={handleFormSubmit}
      />
    </div>
  );
}

export default App;
