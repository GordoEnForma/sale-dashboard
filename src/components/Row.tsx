import { FC, useState } from "react";
import { Row as IRow } from "@tanstack/react-table";
import {
    Box,
    Collapse,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { Sale } from "../api/sales";

type RowProps = {
    row: IRow<Sale>;
    isExpanded: boolean;
};

export const Row: FC<RowProps> = ({ row, isExpanded }) => {
    return (
        <>
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                >
                    <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography
                                variant="h6"
                                gutterBottom
                                component="div"
                            >
                                Detalle de la Venta
                            </Typography>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Producto</TableCell>
                                        <TableCell>Cantidad</TableCell>
                                        <TableCell align="right">
                                            Precio unitario ($)
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.original.products.map((product) => (
                                        <TableRow key={product.name}>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {product.name}
                                            </TableCell>
                                            <TableCell>
                                                {product.quantity}
                                            </TableCell>
                                            <TableCell align="right">
                                                {product.price}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};
