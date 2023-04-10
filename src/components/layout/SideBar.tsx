import { Link, useLocation } from "react-router-dom";
import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import Icecream from "@mui/icons-material/Icecream";
import wat from "../../assets/wat.jpg";

export const SideBar = () => {
  const location = useLocation();
  return (
    <Box
      sx={{
        width: 200,
        height: "100dvh",
        backgroundColor: "#9CA5E1",
        color: "primary.contrastText",
        display: "flex",
        // position: "absolute",
        position: "sticky",
        top: 0,
        left: 0,
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box
        alt="logo"
        component="img"
        src={wat}
        sx={{
          width: "100%",
          height: 180,
          position: "relative",
          top: -10,

          objectFit: "cover",
        }}
        width="inherit"
      ></Box>

      <List
        sx={{
          width: "95%",

          ".MuiListItemButton-root": {
            borderRadius: 12,
            ":hover": {
              backgroundColor: "#3A4CC2",
            },

            my: 2,
          },
          ".MuiListItemIcon-root": {
            color: "inherit",
          },
          ".Mui-selected": {
            backgroundColor: "#6A78D3!important", //Que dios me perdone 🐳
          },
          span: {
            fontSize: 13,
          },
        }}
      >
        <ListItemButton
          component={Link}
          to="/app/home"
          selected={location.pathname === "/app/home"}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>

        <ListItemButton
          component={Link}
          to="/app/sales-history"
          selected={[
            "/app/sales-history",
            "/app/add-sales",
            "/app/edit-sale",
          ].includes(location.pathname)}
        >
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText primary="Sales History" />
        </ListItemButton>

        <ListItemButton
          component={Link}
          to="/app/products"
          selected={location.pathname === "/app/products"}
        >
          <ListItemIcon>
            <Icecream />
          </ListItemIcon>
          <ListItemText primary="Products" />
        </ListItemButton>
      </List>
    </Box>
  );
};
