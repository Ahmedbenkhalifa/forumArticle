import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import ErrorIcon from "../../assets/images/errorIcon";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../actions/authActions";
const Resetpassword = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.userReducer.isAuth);
  const [loading, setLoading] = useState(false);
  const [checkLoading, setCheckLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("token");
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, "le mot de passe doit faire entre 6 et 20 caractères")
        .max(20, "le mot de passe doit faire entre 6 et 20 caractères")
        .required("Le mot de passe est requis"),
      confirmPassword: Yup.string()
        .min(6)
        .max(20)
        .required("La confirmation du mot de passe est requise")
        .oneOf([Yup.ref("password"), null], "Les mots de passes de correspondent pas"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const { data } = await axios.post(`/api/auth/resetPassword/${token}`, values);
        console.log(data);
        await dispatch(signIn({ email: data.email, password: formik.values.password }));
        setLoading(false);
        navigate("/dashboard");
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    },
  });
  const checkToken = async () => {
    try {
      await axios.get(`/api/auth/verifyToken/${token}`);
      setCheckLoading(false);
      setError(false);
    } catch (error) {
      setError(true);
      console.log(error);
      setCheckLoading(false);
    }
  };
  useEffect(() => {
    checkToken();
  }, []);
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
        }}
        component="h1"
        variant="h4"
        align="center"
      >
        Réinitialiser
      </Typography>
      <Typography
        sx={{
          letterSpacing: "6px",
          width: "120%",
          margin: theme.spacing(0, 0, 4, 0),
        }}
        component="h1"
        variant="h4"
        align="center"
      >
        Votre Mot de passe
      </Typography>
      {checkLoading && (
        <CircularProgress
          color="secondary"
          size={200}
          sx={{ width: "200px", height: "200px", margin: "40px auto" }}
        />
      )}
      {!checkLoading && error && (
        <Box sx={{ width: "200px", height: "200px", margin: "40px auto" }}>
          <ErrorIcon />
          <Typography
            color="error"
            component="h1"
            variant="h5"
            align="center"
            sx={{ mt: 2, textTransform: "uppercase" }}
          >
            Token expiré
          </Typography>
        </Box>
      )}
      {!checkLoading && !error && (
        <form
          sx={{ width: "100%" }}
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit(e);
          }}
        >
          <Grid container spacing={2}>
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
                label="Nouveau Mot de passe"
                type="password"
                id="password"
                autoComplete="off"
                color="secondary"
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
            {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Confirmer"}
          </Button>
        </form>
      )}
    </Container>
  );
};

export default Resetpassword;
