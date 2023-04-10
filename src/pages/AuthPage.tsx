import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
type UserCredentials = {
  username: string;
  password: string;
};

export const AuthPage = () => {
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<UserCredentials>();
  const navigate = useNavigate();

  useEffect(() => {
    const user = queryClient.getQueryData(["user"]);
    if (user) {
      navigate("/app/home");
    }
  }, []);

  const onSubmit: SubmitHandler<UserCredentials> = async ({
    username,
    password,
  }) => {
    const response = await login.mutateAsync({ username, password });
    if (response.isAuthenticated) {
      setError(null);
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Grid item xs={12} sm={6} md={4}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h3" textAlign="center">
                Iniciar Sesión
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("username", {
                  required: "El usuario es requerido",
                  minLength: {
                    value: 3,
                    message: "Debe de tener por lo mínimo 3 caracteres",
                  },
                })}
                fullWidth
                label="Username"
                variant="outlined"
                error={!!errors.username}
                helperText={errors.username?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("password", {
                  required: "La contraseña es requerida",
                })}
                fullWidth
                label="Contraseña"
                type="password"
                variant="outlined"
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              {error && (
                <Box
                  sx={{
                    backgroundColor: "red",
                    color: "white",
                    padding: 1,
                    borderRadius: 1,
                  }}
                >
                  {error}
                </Box>
              )}
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isSubmitting}
              >
                Ingresar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};
