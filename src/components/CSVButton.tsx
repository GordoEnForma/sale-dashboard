import { FC, useMemo } from "react";
import { CSVLink } from "react-csv";
import { Sale } from "../api/sales";
import { formatDate } from "../utils/formatDate";
import { Button } from "@mui/material";

type CSVBUttonProps = {
  data: Sale[];
};

export const CSVButton: FC<CSVBUttonProps> = ({ data }) => {
//   console.log(typeof data);
  const csvData = data?.map((sale) => {
    return {
      Cliente: sale.client,
      "Total de la Venta (PEN)": sale.totalSaleAmount,
      "Fecha de la Venta": formatDate(sale.saleDate),
      "Fecha de Actualización": formatDate(sale.updateAt),
      // "Detalle de la Venta": JSON.stringify(sale.productsSold).replace(
      //     /[{}"]/g,
      //     ""
      // ),
    };
  });

  const date = new Date().toLocaleDateString();
  return (
    <Button
      size="small"
      variant="contained"
      sx={{
        backgroundColor: "#008000",
        ":hover": {
          backgroundColor: "#38b000",
        },
        a: {
          color: "white",
          textDecoration: "none",
        },
      }}
    >
      <CSVLink data={csvData} filename={`sales_report_${date}.csv`}>
        Exportar a CSV
      </CSVLink>
    </Button>
  );
};
