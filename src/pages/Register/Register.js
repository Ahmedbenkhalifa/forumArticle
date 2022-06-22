import React, { useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  Alert,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  FormHelperText,
  Grid,
  Link,
  Snackbar,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { signUp } from "../../actions/authActions";
import { registerValidation } from "../../utils/validation";
import ModalVerify from "../../components/ModalVeriy";

const Register = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { isAuth, isLoading, error } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      contry: "",
      email: "",
      password: "",
      confirmPassword: "",
      policy: false,
    },
    validationSchema: registerValidation,
    onSubmit: (values) => {
      console.log(values)
      dispatch(
        signUp({
          firstName: values.firstName,
          lastName: values.lastName,
          contry: values.contry,
          email: values.email,
          password: values.password,
        })
      );
      handleOpen();
    },
  });

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth]);

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        margin: theme.spacing(8, "auto"),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          letterSpacing: "10px",
          margin: theme.spacing(0, 0, 4, 0),
        }}
        component="h1"
        variant="h4"
      >
        Inscription
      </Typography>
      <form
        sx={{ width: "100%" }}
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit(e);
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              error={Boolean(formik.touched.firstName && formik.errors.firstName)}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.firstName}
              helperText={formik.touched.firstName && formik.errors.firstName}
              autoComplete="off"
              name="firstName"
              variant="filled"
              required
              fullWidth
              id="firstName"
              label="Prénom"
              color="primary"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              error={Boolean(formik.touched.lastName && formik.errors.lastName)}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.lastName}
              helperText={formik.touched.lastName && formik.errors.lastName}
              variant="filled"
              required
              fullWidth
              id="lastName"
              label="Nom"
              name="lastName"
              autoComplete="off"
              color="primary"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              error={Boolean(formik.touched.contry && formik.errors.contry)}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.contry}
              helperText={formik.touched.contry && formik.errors.contry}
              variant="filled"
              margin="normal"
              fullWidth
              id="contry"
              label="Pays"
              name="contry"
              autoComplete="off"
              color="primary"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              helperText={formik.touched.email && formik.errors.email}
              variant="filled"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Adresse e-mail"
              name="email"
              autoComplete="off"
              color="primary"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              helperText={formik.touched.password && formik.errors.password}
              variant="filled"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de passe"
              type="password"
              id="password"
              autoComplete="off"
              color="primary"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={Boolean(formik.touched.confirmPassword && formik.errors.confirmPassword)}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              variant="filled"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirmez le mot de passe"
              type="password"
              id="confirmPassword"
              autoComplete="off"
              color="primary"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  name="policy"
                  checked={formik.values.policy}
                  onChange={formik.handleChange}
                  color="primary"
                />
              }
              label="J'ai lu et j'accepte les Conditions d'utilisation"
            />
          </Grid>
          {Boolean(formik.touched.policy && formik.errors.policy) && (
            <Grid item xs={12}>
              <FormHelperText error>{formik.errors.policy}</FormHelperText>
            </Grid>
          )}
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ margin: theme.spacing(2, 0, 2, 0) ,color:'white'}}
        >
          {isLoading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "S'inscrire"}
        </Button>
        <Typography variant="body2">
          Déjà un compte?{" "}
          <Link color="primary" component={RouterLink} to="/login" variant="body2">
            connectez-vous.
          </Link>
        </Typography>
      </form>
      {!isLoading && !error && <ModalVerify open={open} handleClose={handleClose} />}
      {error && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
           e-mail déja existe
          </Alert>
        </Snackbar>
      )}
    </Container>
  );
};

export default Register;
