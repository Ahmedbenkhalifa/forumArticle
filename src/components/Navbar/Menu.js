import React from "react";
import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut as signOutUser } from "../../actions/authActions";
import ModalContact from "../ModalContact";

const Menu = ({ ...rest }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { isAuth, isLoading } = useSelector((state) => state.userReducer);
  const role = useSelector((state) => state.userReducer.user?.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signOut = () => {
    dispatch(signOutUser());
    navigate("/");
  };
  return (
    <Stack direction="row" spacing={1} {...rest}>
      {!isLoading &&
        (isAuth ? (
          <>
            {role === "ADMIN" && (
              <Button color="inherit" onClick={() => navigate("/dashboard")}>
                Dashboard
              </Button>
            )}
            <Button color="inherit" onClick={() => navigate("/Profile")}>
              Profil
            </Button>
            <Button color="inherit" onClick={signOut}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button color="inherit" onClick={() => navigate("/register")}>
              Sign up
            </Button>
          </>
        ))}
      <Button variant="contained" onClick={handleOpen} sx={{ color: "#fff" }}>
        Contact
      </Button>
      <ModalContact open={open} handleClose={handleClose} />
    </Stack>
  );
};

export default Menu;
