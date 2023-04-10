import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const NotAuthorized = () => {
  const navigate = useNavigate();
  return (
    <Box display="flex" textAlign='center' flexDirection='column' alignContent={"center"} justifyItems="center" gap={2} >
      <Typography variant="h4">No tiene permisos para estar acá</Typography>
      <Typography variant="h5">Solicitelos a su administrador</Typography>
      <Button onClick={() => navigate("/app/home")}>Volver al inicio</Button>
    </Box>
  );
};
