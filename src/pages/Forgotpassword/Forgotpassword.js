import * as Yup from "yup";
import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Snackbar,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import axios from "axios";

import MuiAlert from "@mui/material/Alert";
import ModalVerify from "../../components/ModalVeriy";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Forgotpassword = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [alert, setAlert] = React.useState(false);

  const handleClick = () => {
    setAlert(true);
  };

  const theme = useTheme();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Email adress is not valid").required("Email adress is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const { data } = await axios.post("/api/auth/forgetPassword", values);
        setLoading(false);
        setError(false);
        handleOpen();
      } catch (error) {
        setLoading(false);
        handleClick();
        setError(true);
        console.log(error);
      }
    },
  });
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        margin: theme.spacing(16, "auto"),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          letterSpacing: "6px",
          margin: theme.spacing(0, 0, 4, 0),
        }}
        component="h1"
        variant="h4"
        align="center"
      >
        Mot de passe <br />
        oublié
      </Typography>
      <form
        sx={{ width: "100%" }}
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit(e);
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography align="center" variant="body1" sx={{ color: "GrayText" }}>
              Entrez votre adresse
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              helperText={formik.touched.email && formik.errors.email}
              variant="filled"
              required
              fullWidth
              id="email"
              label="Adresse e-mail"
              name="email"
              autoComplete="off"
              color="secondary"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          sx={{ margin: theme.spacing(2, 0, 2, 0) }}
        >
          {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Envoyer"}
        </Button>
      </form>
      {!loading && (
        <ModalVerify
          open={open}
          handleClose={handleClose}
          modalContent={"vérifier votre e-mail pour réinitialiser votre mot de passe"}
        />
      )}
      {error && (
        <Snackbar open={alert} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            ce compte n'existe pas
          </Alert>
        </Snackbar>
      )}
    </Container>
  );
};

export default Forgotpassword;
