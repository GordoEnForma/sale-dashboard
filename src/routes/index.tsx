import { Navigate, createBrowserRouter } from "react-router-dom";
import {
  AuthPage,
  EditSalePage,
  HomePage,
  ProductsPage,
  SalesHistoryPage,
} from "../pages";
import { Layout } from "../components/layout/Layout";
import { SaleForm } from "../components";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="auth" />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/app", // Default route
    element: <Layout />,
    children: [
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "sales-history",
        element: <SalesHistoryPage />,
      },
      {
        path: "add-sales",
        element: <SaleForm />,
      },
      {
        path: "edit-sale/:id",
        element: <EditSalePage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
    ],
  },
  {
    path: "*",
    element: <h1>Not found</h1>,
  },
]);
