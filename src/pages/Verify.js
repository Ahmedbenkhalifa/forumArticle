import React, { useEffect } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Box, Paper, Typography } from "@mui/material";
import Check from "../assets/images/Check";

const Verify = () => {
  const navigate= useNavigate()
  const { token } = useParams();
  console.log(token); /// json.stringify(params)

  const fetchData = async () => {
    try {
      const { data } = await axios.post(`/api/auth/verifyEmail/${token}`);
      setTimeout(() => navigate('/login'), 4000);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData()
  }, []);

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: "#EEE",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper sx={{ width: "60%" }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Check width="150px" />
        </Box>
        <Typography align="center">Vous avez vérifié votre compte avec succès</Typography>
      </Paper>
    </Box>
  );
};

export default Verify;
