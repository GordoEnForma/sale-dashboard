import { FC } from "react";
import { SideBar } from "./SideBar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

type LayoutProps = {
    children: React.ReactNode;
};

export const Layout: FC = () => {
    return (
        <Box display="flex">
            <SideBar />
            <Box
                sx={{
                    backgroundColor: "white",
                    flex: 1,
                    display: "flex",
                    paddingLeft: 2,
                    justifyContent: "space-between",
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
};
