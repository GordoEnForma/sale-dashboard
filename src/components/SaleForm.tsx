import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { useProduct, useMutateSale, useAuth } from "../hooks";
import { Sale } from "../api/sales";
import { NotAuthorized } from "./layout/NotAuthorized";

type Props = {
  isEditing?: boolean;
  sale?: Sale;
};

export const SaleForm: FC<Props> = ({ isEditing = false, sale }) => {
  const navigate = useNavigate();
  const { productsQuery } = useProduct();

  const { addSale, updateSale } = useMutateSale();
  const { isAuthenticated } = useAuth();
  const {
    register,
    watch,
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { defaultValues },
  } = useForm<Sale>({
    defaultValues: {
      id: sale?.id || "",
      client: sale?.client || "",
      productsSold: sale?.productsSold || [
        {
          name: "Product 1",
          quantity: 0,
          category: "Category 1",
          saleAmount: 0,
        },
      ],
    },
  });

  const { fields, append, remove, update, insert } = useFieldArray({
    control,
    name: "productsSold",
  });

  const handleCancel = () => {
    navigate("/app/sales-history");
  };

  const handleFormSubmit = async (data: Sale) => {
    const totalSaleAmount = data.productsSold.reduce(
      (acc, product) => acc + product.saleAmount,
      0
    );
    const saleObject = {
      ...data,
      id: isEditing ? data.id : Math.floor(Math.random() * (100 - 10) + 10),
      totalSaleAmount,
      saleDate: isEditing ? sale?.saleDate! : new Date(),
      updateAt: new Date(),
    };

    if (isEditing) {
      // updateSale.mutate(sale);

      updateSale(saleObject);
      // console.log(saleObject);
    } else {
      // console.log(saleObject);
      addSale.mutate(saleObject);
      
    }
    navigate("/app/sales-history");
  };

  const updateProductName = (index: number, name: string) => {
    const productRows = getValues("productsSold");
    // const productName = productsQuery.data?.[index].name;
    const productQueryInfo = productsQuery.data?.find(
      (product) => product.name === name
    );

    const productName = productQueryInfo?.name;

    // console.log(productName);
    // console.log(selectedProducts);

    // Lógica para seleccionar productos

    // if (productName && selectedProducts.length < productsQuery.data?.length!) {
    //   const originalProducts = productsQuery.data?.flatMap(
    //     (product) => product.name
    //   );
    //   setSelectedProducts([...originalProducts!, productName]);
    // }

    // if (productName && selectedProducts?.includes(productName)) {
    //   const filteredSelectedProducts = selectedProducts.filter(
    //     (product) => product !== productName
    //   );
    //   console.log(filteredSelectedProducts);
    //   setSelectedProducts([...filteredSelectedProducts]);
    //   //   setSelectedProducts([...selectedProducts!, productName]);
    // }

    // console.log(productQueryInfo);
    if (productQueryInfo) {
      productRows[index] = {
        ...productRows[index],
        name: productQueryInfo.name,
        category: productQueryInfo?.category,
        saleAmount: productRows[index].quantity * productQueryInfo!.price,
      };
      //   console.log(productRows[index]);
      setValue(`productsSold.${index}`, productRows[index]);
      //   update(index, productRows[index]);
    }
  };

  const updateProductQuantity = (index: number, quantity: number) => {
    const productRows = getValues("productsSold");
    const productName = productRows[index].name;
    const productQueryInfo = productsQuery.data?.find(
      (product) => product.name === productName
    );

    if (productQueryInfo) {
      productRows[index] = {
        ...productRows[index],
        category: productQueryInfo.category,
        quantity,
        saleAmount: quantity * productQueryInfo.price,
      };
      //   console.log(productRows[index]);
      setValue(`productsSold.${index}`, productRows[index]);
      //   update(index, productRows[index]);
    }
  };

  if (productsQuery.isLoading) return <p>Loading...</p>;
  return (
    <>
      {isAuthenticated ? (
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
            // backgroundColor: "red",
            boxShadow: 6,
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
              onClick={() =>
                append({ name: "", quantity: 0, saleAmount: 0, category: "" })
              }
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
                          {...register(`productsSold.${index}.name` as const, {
                            required: true,
                            value: `${row.name}`,
                            onChange: (e) => {
                              updateProductName(
                                index,
                                e.target.value as string
                              );
                            },
                          })}
                          defaultValue={row.name}
                        >
                          {productsQuery.data?.map((product) => (
                            <MenuItem
                              key={product.id}
                              value={product.name}
                              //   disabled={!selectedProducts?.includes(product.name)}
                            >
                              {product.name}
                            </MenuItem>
                          ))}
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
                          `productsSold.${index}.quantity` as const,
                          {
                            required: true,
                            valueAsNumber: true,
                            onChange: (e) => {
                              updateProductQuantity(
                                index,
                                Number(e.target.value)
                              );
                            },
                          }
                        )}
                        defaultValue={row.quantity}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Button onClick={() => remove(index)}>Quitar</Button>
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
            {isEditing ? "Editar Venta" : "Registrar Venta"}
          </Button>
          <Button sx={{ placeSelf: "center" }} onClick={handleCancel}>
            Cancelar
          </Button>
        </Box>
      ) : (
        <NotAuthorized />
      )}
    </>
  );
};
