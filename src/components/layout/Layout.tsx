import { FC } from "react";
import { SideBar } from "./SideBar";
import { Navigate, Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../hooks/useAuth";

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout: FC = () => {
  const queryClient = useQueryClient();

  const user = queryClient.getQueryData(["user"]);

  console.log("user", user)
  if (!user) {
    return <Navigate to="/auth" />;
  }

  return (
    <Box
      display="flex"
      sx={{
        // backgroundColor:"#EEF4FA",
        backgroundColor: "white",
      }}
    >
      <SideBar />

      <Box
        sx={{
          backgroundColor: "#EEF4FA",
          flex: 1,
          display: "flex",
          // height: "100%",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
