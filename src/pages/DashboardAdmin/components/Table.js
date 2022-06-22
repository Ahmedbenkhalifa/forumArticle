import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Box, Button, CircularProgress } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SecurityIcon from "@mui/icons-material/Security";
import RowsOverlayIcon from "../../../assets/icons/RowsOverlay";

export default function DataGridDemo({ getRow, handleOpen, sx, ...rest }) {
  const [clients, setClients] = useState([]);

  const getAllUsers = async () => {
    try {
      const { data } = await axios.get("/api/client/getUsers");
      setClients(
        data.users.map((user) => ({
          ...user,
          id: user._id,
          verified: user.verified ? "Activé" : "desactivé",
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const { data } = await axios.delete(`/api/client/deleteUser/${id}`);
      setClients(clients.filter((client) => client.id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  const disableUser = async (id) => {
    try {
      const { data } = await axios.put(`/api/client/disableUser/${id}`);
      getAllUsers();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  const columns = [
    { field: "email", headerName: "Email", width: 220 },
    {
      field: "firstName",
      headerName: "Prénom",
      width: 120,
      editable: false,
    },
    {
      field: "lastName",
      headerName: "Nom",
      width: 120,
      editable: false,
    },
    { field: "contry", headerName: "Pays", width: 110, editable: false },
    { field: "createdAt", headerName: "Date de creation", width: 150, editable: false },
    { field: "lastLogin", headerName: "Dérniere connexion", width: 150, editable: false },
    { field: "verified", headerName: "Status", width: 70, editable: false },

    {
      field: "actions",
      type: "actions",
      width: 50,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<SecurityIcon />}
          label={params.row.verified === "Activé" ? "Desactiver" : "Activer"}
          onClick={() => disableUser(params.id)}
          showInMenu
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => deleteUser(params.id)}
          showInMenu
        />,
      ],
    },
  ];

  const CustomNoRowsOverlay = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <RowsOverlayIcon />
        <Box sx={{ mt: 1 }}>No Rows</Box>
      </Box>
    );
  };

  return (
    <Box sx={{ height: 400, width: "100%", ...sx }} {...rest}>
      <DataGrid
        components={{
          NoRowsOverlay: CustomNoRowsOverlay,
          LoadingOverlay: <CircularProgress />,
        }}
        rows={clients}
        rowHeight={30}
        headerHeight={40}
        withBorder={false}
        columns={columns}
        rowsPerPageOptions={[5, 25, 100]}
        sx={{
          borderRadius: "5px",
          border: "1px solid rgb(51,55,103)",
          overflow: "hidden",
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#EEE",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiTablePagination-selectLabel": {
            display: "none !important",
          },
          "& .MuiTablePagination-toolbar": {
            width: "100%",
            justifyContent: "space-between",
          },
          "& .MuiTablePagination-root": {
            width: "100%",
          },
          "& .MuiTablePagination-spacer": {
            display: "none",
          },
          "& .MuiTablePagination-select": {
            flex: "1",
          },
        }}
      />
    </Box>
  );
}
