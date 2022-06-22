import React, { useState } from "react";
import { Box, TextField, Button, CircularProgress, Snackbar } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import MuiAlert from "@mui/material/Alert";
import { useDispatch } from "react-redux";
import {  updateUser } from "../actions/authActions";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const EditInput = ({ dynamicKey, initial, validation, disabled, submit, ...rest }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

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
      value: initial,
    },
    validationSchema: Yup.object({
      value: validation,
    }),
    onSubmit: async (values) => {
      const formData = { [dynamicKey]: Object.values(values)[0] };
      setIsLoading(true);
      try {
         await axios.put(`/api/auth/updateAccount`, formData);
        handleClick();
        setIsLoading(false);
        dispatch(updateUser(formData));
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    },
  });
  return (
    <Box
      component={"form"}
      variant="form"
      sx={{ display: "flex", flexDirection: "row", mt: 2 }}
      onSubmit={formik.handleSubmit}
    >
      <TextField
        error={Boolean(formik.touched.value && formik.errors.value)}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.value}
        helperText={formik.touched.value && formik.errors.value}
        name="value"
        id="value"
        autoComplete="off"
        variant="outlined"
        color="primary"
        {...rest}
        disabled={disabled}
        fullWidth
      />
      <Button
        type="submit"
        size="small"
        sx={{ maxHeigth: "56px", width: "87px", px: 2, ml: 2 }}
        disabled={disabled}
        variant="outlined"
        color="success"
      >
        {isLoading ? <CircularProgress size={24} color="success" /> : "Changer"}
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Profil a été modifié avec succès.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EditInput;
