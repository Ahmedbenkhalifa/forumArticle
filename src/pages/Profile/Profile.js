import React, { useState } from "react";
import * as Yup from "yup";
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import UpdateIcon from "@mui/icons-material/Update";
import { useSelector } from "react-redux";
import { useTheme } from "@emotion/react";
import EditInput from "../../components/EditInput";
import avatar from "../../assets/images/avatar.png";

const Profile = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const user = useSelector((state) => state.userReducer.user);
  const [disabled, setDisabled] = useState(true);
  const handleClick = () => {
    setDisabled(!disabled);
  };
  return (
    <Container maxWidth="sm" component={Paper} sx={{ background: "#EEE", mt: 10, p: 2 }}>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="h5" sx={{ fontWeight: "500" }}>
        Mon Profil
      </Typography>
      <Typography variant="body2" sx={{ color: "GrayText" }}>
        Gérez les paramètres de votre profil
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: !matches ? "flex-end" : "flex-start",
          my: 2,
          justifyContent: "space-between",
          flexDirection: matches ? "column" : "",
        }}
      >
        <img
          alt="img profil"
          src={avatar}
          style={{
            borderRadius: "50%",
            width: matches ? "136px" : "146px",
            height: matches ? "136px" : "146px",
            boxShadow:
              "0px 6px 6px -3px rgb(0 0 0 / 20%), 0px 10px 14px 1px rgb(0 0 0 / 14%), 0px 4px 18px 3px rgb(0 0 0 / 12%)",
          }}
        />
        <Button variant="outlined" color="primary" sx={{ mt: 2, mb: 1,width:'120px' }} onClick={handleClick}>
          <UpdateIcon sx={{ mr: 1 }} />
          Modifier
        </Button>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ width: matches ? "100%" : "500px" }}>
        <EditInput
          label={"Prénon"}
          initial={user.firstName}
          validation={Yup.string().max(20).required("Le prénom est requis")}
          disabled={disabled}
          dynamicKey={"firstName"}
        />

        <EditInput
          label={"Nom"}
          initial={user.lastName}
          validation={Yup.string().max(20).required("Le nom est requis")}
          id="lastName"
          disabled={disabled}
          dynamicKey={"lastName"}
        />
        <EditInput
          label={"Pays"}
          initial={user.contry}
          validation={Yup.string().max(20).required("Le nom est requis")}
          id="contry"
          disabled={disabled}
          dynamicKey={"contry"}
        />
        <EditInput
          label={"Email"}
          initial={user.email}
          validation={Yup.string()
            .email("L'e-mail n'est pas valide")
            .required("L'e-mail est requis")}
          id="email"
          disabled={disabled}
          dynamicKey={"email"}
        />
        <EditInput
          label="Nouveau mot de passe"
          initial={""}
          validation={Yup.string()
            .min(6, "le mot de passe doit faire entre 6 et 20 caractères")
            .max(20, "le mot de passe doit faire entre 6 et 20 caractères")
            .required("Le mot de passe est requis")}
          id="password"
          disabled={disabled}
          placeholder="*****"
          dynamicKey={"password"}
        />
      </Box>
      <Divider sx={{ my: 2 }} />
    </Container>
  );
};

export default Profile;
