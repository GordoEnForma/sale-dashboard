import { createBrowserRouter } from "react-router-dom";
import { HomePage, ProductsPage, SalesHistoryPage } from "../pages";
import { Layout } from "../components/layout/Layout";
import { SaleForm } from "../components";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/home",
                element: <HomePage />,
            },
            {
                path: "/sales-history",
                element: <SalesHistoryPage />,
            },
            {
                path: "/add-sales",
                element: <SaleForm />,
            },
            {
                path: "/edit-sale/:id",
                element: <SaleForm />,
            },
            {
                path: "/products",
                element: <ProductsPage />,
            },
        ],
    },
]);
