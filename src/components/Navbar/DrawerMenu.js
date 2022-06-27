import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import { Button, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut as signOutUser } from "../../actions/authActions";
import ModalContact from "../ModalContact";

export default function DrawerMenu({ isOpen, handleClose }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const { isAuth, isLoading } = useSelector((state) => state.userReducer);
  const role = useSelector((state) => state.userReducer.user?.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signOut = () => {
    dispatch(signOutUser());
    navigate("/");
  };
  const list = (anchor) => (
    <Box
      sx={{
        height: "100%",
        width: 250,
      }}
      role="presentation"
    >
      {!isLoading &&
        (isAuth ? (
          <List sx={{ mt: 8 }}>
            {role === "ADMIN" && (
              <ItemList
                onClick={() => {
                  handleClose();
                  navigate("/dashboard");
                }}
                button
              >
                Dashboard
              </ItemList>
            )}
            <Divider variant="middle" sx={{ width: "50%", margin: "0 auto" }} />
            <ItemList
              onClick={() => {
                handleClose();
                navigate("/profile");
              }}
              button
            >
              Profil
            </ItemList>
            <Divider variant="middle" sx={{ width: "50%", margin: "0 auto" }} />
            <ItemList
              onClick={() => {
                handleClose();
                signOut();
              }}
              button
            >
              Logout
            </ItemList>
            <Divider variant="middle" sx={{ width: "50%", margin: "0 auto" }} />
          </List>
        ) : (
          <List sx={{ mt: 8 }}>
            <ItemList
              onClick={() => {
                handleClose();
                navigate("/login");
              }}
              button
            >
              Login
            </ItemList>
            <Divider variant="middle" sx={{ width: "50%", margin: "0 auto" }} />
            <ItemList
              onClick={() => {
                handleClose();
                navigate("/register");
              }}
              button
            >
              Sign up
            </ItemList>
            <Divider variant="middle" sx={{ width: "50%", margin: "0 auto" }} />
          </List>
        ))}
      <Button
        sx={{
          display: "block",
          margin: "0 auto",
          fontSize: "20px",
        }}
        variant="contained"
        onClick={handleOpen}
      >
        Contact
      </Button>
      <ModalContact open={open} handleClose={closeModal} />
    </Box>
  );

  return (
    <Drawer anchor={"left"} open={isOpen} onClose={handleClose}>
      {list("left")}
    </Drawer>
  );
}

const ItemList = styled(ListItem)(() => ({
  py: 2,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "20px",
}));
