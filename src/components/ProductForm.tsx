import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Box, Button, TextField, Typography } from "@mui/material";

import { Product } from "../api/products";
import { useQueryClient } from "@tanstack/react-query";

export const ProductForm: FC = () => {
  const navigation = useNavigate();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Product>({
    defaultValues: {
      id: Math.floor(Math.random() * (100 - 10) + 10),
      name: "",
      category: "",
      price: 0,
    },
  });

  const onSubmit = (data: Product) => {
    queryClient.setQueryData<Product>(["products"], (oldData: Product[]) => {
      return [...oldData, data];
    });
   
    window.alert("Producto añadido con éxito");
    navigation("/app/sales-history");
  };

  return (
    <Box
      component="form"
      sx={{
        alignSelf: "center",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
        maxWidth: 500,
        height: 400,
        margin: "0 auto",
        padding: 2,
        // backgroundColor: "red",
        boxShadow: 6,
        "& .MuiTextField-root": {
          m: 1,
          maxWidth: 500,
          backgroundColor: "white",
        },
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography variant="h4" textAlign="center">
        Añadir un nuevo producto
      </Typography>
      <TextField
        label="Nombre del Producto"
        type="text"
        {...register("name", {
          required: "El nombre del producto es requerido",
          minLength: {
            value: 3,
            message: "El nombre del producto debe tener al menos 3 caracteres",
          },
          maxLength: 20,
        })}
        error={!!errors.name}
        helperText={errors.name?.message}
        variant="outlined"
      />
      <TextField
        label="Categoría del Producto"
        type="text"
        variant="outlined"
        {...register("category", {
          required: "La categoría del producto es requerida",
          minLength: {
            value: 3,
            message: "La categoría debe tener al menos 3 caracteres",
          },
          maxLength: 20,
        })}
        error={!!errors.category}
        helperText={errors.category?.message}
      />
      <TextField
        label="Precio del Producto"
        type="number"
        {...register("price", {
          required: "Ingresar un precio válido",
          min: { value: 1, message: "El precio debe ser mayor a 1" },
          max: 1000000,
        })}
        error={!!errors.price}
        helperText={errors.price?.message}
      />

      <Box display="flex" gap={3} justifyContent="center">
        <Button type="submit">Registrar Producto</Button>
        <Button onClick={() => navigation(-1)}>Regresar</Button>
      </Box>
      {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
    </Box>
  );
};
