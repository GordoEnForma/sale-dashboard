import { Box } from "@mui/material";
import { ProductForm } from "../components/ProductForm";
import { NotAuthorized } from "../components/layout/NotAuthorized";
import { useAuth } from "../hooks";

export const ProductsPage = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <ProductForm />
  ) : (
    <Box
      width="100%"
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems={{ xs: "center", md: "center" }}
      justifyContent="center"
    >
      <NotAuthorized />;
    </Box>
  );
  // <ProductForm />
};
