import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import { Container, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";
import { useNavigate } from "react-router-dom";
import Menu from "./Navbar/Menu";
import HamburgerMenu from "./Navbar/HamburgerMenu";
import AddBoxIcon from '@mui/icons-material/AddBox';

const drawerWidth = 240;
const SideBar = ({ isAdmin, children }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="absolute" sx={{ background: "#FFE69A" }} open={open && !matches}>
        <Toolbar
          sx={{
            pr: "24px",
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              display: { md: "block", xs: "none" },
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography component="h1" variant="h6" color="inherit">
              Espace {isAdmin ? "Admin" : "Client"}
            </Typography>
            {/* Menu NAVBAR */}
            <Box sx={{ display: { md: "block", xs: "none" } }}>
              <Menu sx={{ alignItems: "center" }} />
            </Box>
            <Box sx={{ display: { md: "none", xs: "block" } }}>
              <HamburgerMenu />
            </Box>
            {/* {-----------------} */}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open && !matches}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <ListDrawer />
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="xl" sx={{ my: 4 }}>
          {children}
        </Container>
      </Box>
    </Box>
  );
};

const ListDrawer = () => {
  const navigate = useNavigate();
  return (
    <List component="nav">
      <ListItemButton onClick={() => navigate("")}>
        <ListItemIcon>
          <AddBoxIcon />
        </ListItemIcon>
        <ListItemText primary="Ajouter un Article" />
      </ListItemButton>
      <Divider sx={{ my: 1 }} />
      <ListItemButton onClick={() => navigate("listAllArticle")}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="List des Articles" />
      </ListItemButton>
      <Divider sx={{ my: 1 }} />
      <ListItemButton onClick={() => navigate("users")}>
        <ListItemIcon>
           <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="List des utilisateurs" />
      </ListItemButton>
    </List>
  );
};

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    "& .MuiDrawer-paper": {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: "border-box",
      ...(!open && {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
          width: theme.spacing(9),
        },
      }),
    },
  })
);
export default SideBar;
