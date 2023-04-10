import { FC } from "react";
import { Sale } from "../api/sales";
import { IconButton, Tooltip } from "@mui/material";
import { useMutateSale } from "../hooks";
import { useNavigate } from "react-router-dom";

type Props = {
  sale: Sale;
  icon: JSX.Element;
  title: string;
};

export const ActionToolTip: FC<Props> = ({ sale, icon, title }) => {
  const { updateSale, removeSale } = useMutateSale();
  const navigate = useNavigate();
  const handleAction = () => {
    if (title === "Editar Venta") {
      navigate(`/app/edit-sale/${sale.id}`);
    } else if (title === "Eliminar Venta") {
      console.log(String(sale.id));
      confirm("¿Estás seguro de eliminar esta venta?")
        ? removeSale(String(sale.id))
        : null;

      //   removeSale(String(sale.id));
    }
  };
  return (
    <Tooltip title={title} onClick={handleAction}>
      <IconButton>{icon}</IconButton>
    </Tooltip>
  );
};
