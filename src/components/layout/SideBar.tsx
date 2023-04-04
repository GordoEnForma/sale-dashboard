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
                flexDirection: "column",
                alignItems: "center",
                position: "sticky",
                top: 0,
            }}
        >
            <Box
                alt="logo"
                component="img"
                src={wat}
                sx={{
                    width: "100%",
                    height: 180,
                }}
                width="inherit"
            ></Box>
            <Divider />
            <List
                sx={{
                    width: "95%",
                    ".MuiListItemButton-root": {
                        ":hover": {
                            backgroundColor: "#6A78D3",
                        },

                        my: 2,
                    },
                    ".MuiListItemIcon-root": {
                        color: "inherit",
                    },
                    ".Mui-selected": {
                        backgroundColor: "#3A4CC2",
                    },
                }}
            >
                <ListItemButton
                    component={Link}
                    to="/home"
                    selected={location.pathname === "/home"}
                >
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItemButton>
                <Divider />
                <ListItemButton
                    component={Link}
                    to="/sales-history"
                    selected={location.pathname === "/sales-history"}
                >
                    <ListItemIcon>
                        <HistoryIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sales History" />
                </ListItemButton>
                <Divider />
                <ListItemButton
                    component={Link}
                    to="/products"
                    selected={location.pathname === "/products"}
                >
                    <ListItemIcon>
                        <Icecream />
                    </ListItemIcon>
                    <ListItemText primary="Products" />
                </ListItemButton>
                <Divider />
            </List>
        </Box>
    );
};
