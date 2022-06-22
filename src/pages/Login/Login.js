import React, { useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Link,
  Snackbar,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { signIn } from "../../actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { loginValidation } from "../../utils/validation";
import MuiAlert from "@mui/material/Alert";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const { error, isAuth, isLoading } = useSelector((state) => state.userReducer);
  const role = useSelector((state) => state.userReducer.user?.role);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidation,
    onSubmit: (values) => {
      handleClick();
      dispatch(signIn(values));
    },
  });
  useEffect(() => {
    if (isAuth && role === "ADMIN") {
      navigate("/dashboard");
    } else if (isAuth && role === "CLIENT") {
      navigate("/");
    }
  }, [isAuth, navigate]);
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  return (
    <Box sx={{ pt: 10, width: "100%", height: "100vh", backgroundColor: "#EEE" }}>
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
          component="h1"
          variant="h4"
          align="center"
          sx={{ letterSpacing: "10px", margin: theme.spacing(0, 0, 4, 0) }}
        >
          Espace Client
        </Typography>
        <form style={{ width: "100%" }} onSubmit={formik.handleSubmit}>
          <TextField
            error={Boolean(formik.touched.email && formik.errors.email)}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            helperText={formik.touched.email && formik.errors.email}
            variant="filled"
            margin="normal"
            fullWidth
            id="email"
            label="Adresse e-mail"
            name="email"
            autoComplete="off"
            color="primary"
          />
          <TextField
            error={Boolean(formik.touched.password && formik.errors.password)}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
            helperText={formik.touched.password && formik.errors.password}
            variant="filled"
            margin="normal"
            fullWidth
            name="password"
            label="Mot de passe"
            type="password"
            id="password"
            color="primary"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ margin: theme.spacing(2, 0, 2, 0) }}
          >
            {isLoading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Se connecter"}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link color="primary" variant="body2" component={RouterLink} to="/forgotPassword">
                Mot de passe oublié?
              </Link>
            </Grid>
            <Grid item>
              <span style={{ fontSize: "14px" }}>Pas de compte?</span>{" "}
              <Link color="primary" component={RouterLink} to="/register" variant="body2">
                inscrivez-vous
              </Link>
            </Grid>
          </Grid>
        </form>{" "}
        {error && (
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
              Verifier votre email ou mot de passe
            </Alert>
          </Snackbar>
        )}
      </Container>
    </Box>
  );
};

export default SignIn;
