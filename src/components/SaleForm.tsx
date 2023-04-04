import { FC } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
    Box,
    Button,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
    TableContainer,
    Paper,
} from "@mui/material";
import { useProduct } from "../hooks/useProduct";

type ProductWithQuantity = {
    name: string;
    quantity: number;
};

type SaleSchema = {
    client: string;
    products: ProductWithQuantity[];
};


type Props = {
    isEditing?: boolean;
    // sale: ;
};

export const SaleForm: FC<Props> = ({ isEditing = false }) => {
    const { productsQuery } = useProduct();

    const {
        register,
        watch,
        control,
        handleSubmit,
        setValue,
        getValues,
        formState: { defaultValues },
    } = useForm<SaleSchema>({
        defaultValues: {
            client: "",
            products: [
                {
                    name: productsQuery.data?.[0].name || "",
                    quantity: 0,
                },
            ],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "products",
    });

    const handleFormSubmit = async (data: SaleSchema) => {
        console.log(data);
    };

    const updateProductQuantity = (index: number, quantity: number) => {};

    // const calculateTotal = () => {
    //     return productRows.reduce(
    //         (total, row) => total + row.product.price * row.quantity,
    //         0
    //     );
    // };

    if (productsQuery.isLoading) return <p>Loading...</p>;
    return (
        <Box
            component="form"
            sx={{
                alignSelf: "center",
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: "100%",
                maxWidth: 600,
                height: 600,
                margin: "0 auto",
                padding: 2,
                backgroundColor: "#EEF0FA",
                boxShadow: 4,
            }}
        >
            {isEditing ? (
                <Typography variant="h5" textAlign="center">
                    Editar Venta
                </Typography>
            ) : (
                <Typography variant="h5" textAlign="center">
                    Nueva Venta
                </Typography>
            )}
            {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
            <Typography variant="h6">Añadir Cliente</Typography>
            <TextField
                sx={{
                    maxWidth: 600,
                    backgroundColor: "white",
                }}
                label="Nombre del Cliente"
                {...register("client", { required: true })}
            />
            <Box width="100%" display="flex" justifyContent="space-between">
                <Typography variant="h6">Añadir Productos</Typography>
                <Button
                    variant="contained"
                    onClick={() => append({ name: "", quantity: 0 })}
                >
                    Añadir producto
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table
                    stickyHeader
                    sx={{
                        width: "100%",
                        maxWidth: 600,
                        margin: "0 auto",
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>Producto</TableCell>
                            <TableCell align="right">Cantidad</TableCell>
                            <TableCell align="center">Accion</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {fields.map((row, index) => (
                            <TableRow key={row.id}>
                                <TableCell>
                                    <FormControl
                                        variant="outlined"
                                        sx={{
                                            minWidth: 140,
                                        }}
                                    >
                                        <InputLabel id="product-select-label">
                                            Producto
                                        </InputLabel>
                                        <Select
                                            {...register(
                                                `products.${index}.name`
                                            )}
                                        >
                                            {productsQuery.data?.map(
                                                (product) => (
                                                    <MenuItem
                                                        key={product.id}
                                                        value={product.name}
                                                    >
                                                        {product.name}
                                                    </MenuItem>
                                                )
                                            )}
                                        </Select>
                                    </FormControl>
                                </TableCell>
                                <TableCell align="right">
                                    <TextField
                                        label="Cantidad"
                                        type="number"
                                        sx={{
                                            width: 100,
                                        }}
                                        {...register(
                                            `products.${index}.quantity`,
                                            {
                                                required: true,
                                                valueAsNumber: true,
                                            }
                                        )}
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <Button onClick={() => remove(index)}>
                                        Quitar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* <div>Total: {calculateTotal()}</div> */}
            <Button
                sx={{
                    placeSelf: "center",
                    backgroundColor: "#3F51B5",
                    color: "white",
                }}
                onClick={handleSubmit(handleFormSubmit)}
            >
                Submit
            </Button>
        </Box>
    );
};
