import { useParams } from "react-router-dom";
import { SaleForm } from "../components";
import { useQueryClient } from "@tanstack/react-query";
import { Sale } from "../api/sales";

export const EditSalePage = () => {
  const params = useParams();
  console.log(params.id)
  const queryClient = useQueryClient();

  const sales = queryClient.getQueryData<Sale[]>(["sales"]);

  const sale = sales?.find((sale) => sale.id === Number(params.id));

  console.log(sale);

  return <SaleForm isEditing sale={sale} />;
};
