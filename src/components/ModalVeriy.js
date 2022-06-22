import React from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import img from "../assets/images/verificationEmail.png";

const ModalVerify = ({ open, handleClose, modalContent }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "500px",
    height: "500px",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    borderRadius: 2,
    boxShadow: 24,
    backdropFilter: "blur(5px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Box>
          <Typography align="center" variant="h4" sx={{ mt: 4 }}>
            vérifier votre Email
          </Typography>
          <Typography align="center" variant="body1" sx={{ color: "GrayText" }}>
            {modalContent ? modalContent : "vérifier votre e-mail pour activer votre compte"}
          </Typography>
        </Box>
        <img src={img} width={"200px"} height={"300px"} style={{ objectFit: "contain" }} />
        <Button color="secondary" variant="outlined">
          verifier email
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalVerify;
