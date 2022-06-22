import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";

export default function DrawerMenu({ isOpen, handleClose }) {
  const list = (anchor) => (
    <Box
      sx={{
        height: "100%",
        width: 250,
      }}
      role="presentation"
    >
      <List sx={{ mt: 8 }}>
        {["Accueil", "Présentation", "Produits", "Témoignages", "Contact"].map((text, index) => (
          <div key={index}>
            <ListItem
              onClick={handleClose}
              sx={{
                py: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "20px",
              }}
              button
              key={text}
            >
              {text}
            </ListItem>
            <Divider variant="middle" sx={{ width: "50%", margin: "0 auto" }} />
          </div>
        ))}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "20px",
          }}
        ></Box>
      </List>
    </Box>
  );

  return (
    <Drawer anchor={"left"} open={isOpen} onClose={handleClose}>
      {list("left")}
    </Drawer>
  );
}
