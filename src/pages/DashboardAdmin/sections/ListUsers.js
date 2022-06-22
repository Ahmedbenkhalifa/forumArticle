import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Paper, Typography } from "@mui/material";
import Table from "../components/Table";

const ListUsers = () => {
  const user = useSelector((state) => state.userReducer.user);
  const [isOpen, setIsopen] = useState(false);
  const handleOpen = () => setIsopen(true);

  const [expanded, setExpanded] = useState(false);
  const handleChange = (open) => (event, newExpanded) => {
    if (isOpen) {
      setIsopen(false);
    }
    setExpanded(newExpanded ? open : false);
  };
  const [row, SetRow] = useState();
  const getRow = (row) => SetRow(row);

  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h5" sx={{ mb: 2 }}>
        Liste des clients
      </Typography>
      <Table getRow={getRow} handleOpen={handleOpen} />
    </Paper>
  );
};

export default ListUsers;
