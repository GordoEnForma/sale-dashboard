import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  flexRender,
  getExpandedRowModel,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
  FilterFn,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { rankItem } from "@tanstack/match-sorter-utils";
import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { NotAuthorized } from "../components/layout/NotAuthorized";
import { CSVButton, Row, DebouncedInput, DatePicker } from "../components";
import { Sale } from "../api/sales";
import { useSales, useAuth } from "../hooks";
import { formatDate } from "../utils/formatDate";
import { ActionToolTip } from "../components/ActionToolTip";

const columnHelper = createColumnHelper<Sale>();

const fuzzyFilter: FilterFn<Sale> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

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
    header: () => <span>Nombre del Cliente</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("totalSaleAmount", {
    header: () => <span>Total de la Venta (PEN)</span>,
    // cell: (info) => info.getValue(),
    cell: ({ row }) => row.renderValue("totalSaleAmount"),
  }),

  columnHelper.accessor((row) => `${formatDate(row.saleDate)}`, {
    id: "saleDate",
    header: () => <span>Fecha de la Venta</span>,
    enableGlobalFilter: false,
  }),
  columnHelper.accessor((row) => `${formatDate(row.updateAt)}`, {
    id: "updateAt",
    header: () => <span>Fecha de Actualización</span>,
    enableGlobalFilter: false,
  }),
  columnHelper.display({
    id: "actions",
    header: () => <span>Acciones</span>,
    cell: ({ row }) => {
      return (
        <>
          <Box width={"100%"} display="flex">
            <ActionToolTip
              sale={row.original}
              icon={<EditIcon />}
              title="Editar Venta"
            />
            <ActionToolTip
              sale={row.original}
              icon={<DeleteIcon />}
              title="Eliminar Venta"
            />
          </Box>
          {/* <Button
            {...{
              onClick: () => {
                console.log(row);
              },
              style: { cursor: "pointer" },
            }}
          >
            Eliminar
          </Button> */}
        </>
      );
    },
  }),
];
export const SalesHistoryPage = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();
  const { salesQuery } = useSales();

  // console.log(isAuthenticated);

  const table = useReactTable({
    data: salesQuery.data || [],
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    globalFilterFn: fuzzyFilter,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getRowCanExpand: () => true,
  });

  if (salesQuery.isLoading) return <div>Cargando Ventas...</div>;
  // console.log(globalFilter);
  return (
    <>
      <Box
        width="100%"
        height="100vh"
        display="flex"
        flexDirection="column"
        alignItems={{ xs: "center", md: "center" }}
        justifyContent="space-evenly"
      >
        {isAuthenticated ? (
          <>
            <Typography variant="h4" textAlign="center" letterSpacing={2}>
              Historial de ventas
            </Typography>

            <Box
              sx={{
                backgroundColor: "#EEF0FA",
                boxShadow: 4,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                height: 450,
                // margin: "auto",
                maxWidth: 800,
                padding: 2,
                width: "100%",
              }}
            >
              <Box
                sx={{
                  mb: 2,

                  input: {
                    width: 200,
                    height: 20,
                    fontWeight: "bold",
                    fontSize: 18,
                  },
                }}
              >
                <DebouncedInput
                  value={globalFilter ?? ""}
                  onChange={(value) => setGlobalFilter(String(value))}
                  placeholder="Buscar"
                />
                <DatePicker
                  value={
                    (table.getFlatHeaders()[3].column.getFilterValue() ??
                      "") as string
                  }
                  onChange={(value) =>
                    table
                      .getFlatHeaders()[3]
                      .column.setFilterValue(String(value))
                  }
                  placeholder="Buscar"
                  type="date"
                />
              </Box>
              <Box height={50} display="flex" gap={3} justifyContent="flex-end">
                <Button
                  size="small"
                  variant="contained"
                  sx={{}}
                  onClick={() => navigate("/app/add-sales")}
                >
                  + Añadir Venta
                </Button>
                <CSVButton data={salesQuery.data || []} />
              </Box>
              <TableContainer>
                {/* <pre>{JSON.stringify(table.getFilteredRowModel(), null, 2)}</pre> */}
                {/* <pre>{JSON.stringify(table.getState(), null, 2)}</pre> */}
                {/* {console.log(table.getFlatHeaders()[4].column.getFilterValue())} */}
                <Table stickyHeader size="small">
                  <TableHead>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <TableCell key={header.id} align="center">
                            {header.isPlaceholder ? null : (
                              <Box
                                {...{
                                  className: header.column.getCanSort()
                                    ? "cursor-pointer select-none"
                                    : "",
                                  onClick:
                                    header.column.getToggleSortingHandler(),
                                }}
                              >
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                                {{
                                  asc: " 🔼",
                                  desc: " 🔽",
                                }[header.column.getIsSorted() as string] ??
                                  null}
                              </Box>
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
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id} align="center">
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                        {row.getIsExpanded() ? (
                          <Row row={row} isExpanded={row.getIsExpanded()} />
                        ) : null}
                      </>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </>
        ) : (
          <NotAuthorized />
        )}
      </Box>
    </>
  );
};
