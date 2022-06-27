import React from "react";
import { Box, Modal, Typography } from "@mui/material";
import EmailBox from "./EmailBox";

const ModalContact = ({ open, handleClose }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    // width: "500px",
    // height: "500px",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    borderRadius: 2,
    boxShadow: 24,
    backdropFilter: "blur(5px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingX:'15px',
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography align="center" variant="h5" sx={{ mt: 4 }}>
          Contacter nous par Email
        </Typography>
        <EmailBox />
      </Box>
    </Modal>
  );
};

export default ModalContact;
