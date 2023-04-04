import { useNavigate } from "react-router-dom";
import {
    useReactTable,
    createColumnHelper,
    ExpandedState,
    getCoreRowModel,
    flexRender,
    getExpandedRowModel,
    ColumnDef,
} from "@tanstack/react-table";
import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useSales } from "../hooks/useSales";
import { Sale } from "../api/sales";
import { formatDate } from "../utils/formatDate";
import { Fragment } from "react";
import { Row } from "../components/Row";

const columnHelper = createColumnHelper<Sale>();

const columns = [
    columnHelper.display({
        id: "detail",
        header: () => <span>Ver Detalle</span>,
        cell: ({ row }) => {
            return row.getCanExpand() ? (
                <Button
                    {...{
                        onClick: row.getToggleExpandedHandler(),
                        style: { cursor: "pointer" },
                    }}
                >
                    {row.getIsExpanded() ? (
                        <KeyboardArrowUpIcon />
                    ) : (
                        <KeyboardArrowDownIcon />
                    )}
                </Button>
            ) : null;
        },
    }),
    columnHelper.accessor("client", {
        header: () => <span>Cliente</span>,
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("saleAmount", {
        header: () => <span>Monto Total</span>,
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("saleDate", {
        header: () => <span>Fecha de la Venta</span>,
        cell: (info) => formatDate(info.getValue()),
    }),
    columnHelper.accessor("updateAt", {
        header: () => <span>Fecha de Actualización</span>,
        cell: (info) => formatDate(info.getValue()),
    }),
];
export const SalesHistoryPage = () => {
    const navigate = useNavigate();
    const { salesQuery } = useSales();

    const table = useReactTable({
        data: salesQuery.data || [],
        columns,
        getRowCanExpand: () => true,
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
    });

    if (salesQuery.isLoading) return <div>Cargando Ventas...</div>;

    return (
        <>
            <Box
                width="100%"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="space-evenly"
            >
                <Typography variant="h4" textAlign="center">
                    Historial de ventas
                </Typography>

                <Box
                    sx={{
                        alignSelf: "center",
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        width: "100%",
                        maxWidth: 800,
                        height: 450,
                        margin: "0 auto",
                        padding: 2,
                        backgroundColor: "#EEF0FA",
                        boxShadow: 4,
                    }}
                >
                    <Button
                        variant="contained"
                        sx={{
                            alignSelf: "self-end",
                        }}
                        onClick={() => navigate("/add-sales")}
                    >
                        + Añadir Venta
                    </Button>
                    <TableContainer>
                        <Table stickyHeader size="small">
                            <TableHead>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <TableCell
                                                key={header.id}
                                                align="center"
                                            >
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column
                                                              .columnDef.header,
                                                          header.getContext()
                                                      )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableHead>
                            <TableBody>
                                {table.getRowModel().rows.map((row) => (
                                    <>
                                        <TableRow key={row.id}>
                                            {row
                                                .getVisibleCells()
                                                .map((cell) => (
                                                    <TableCell
                                                        key={cell.id}
                                                        align="center"
                                                    >
                                                        {flexRender(
                                                            cell.column
                                                                .columnDef.cell,
                                                            cell.getContext()
                                                        )}
                                                    </TableCell>
                                                ))}
                                        </TableRow>
                                        {row.getIsExpanded() ? (
                                            <Row
                                                row={row}
                                                isExpanded={row.getIsExpanded()}
                                            />
                                        ) : null}
                                    </>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </>
    );
};
