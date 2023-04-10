import {
  Box,
  Typography,
  Tooltip as ToolTipMui,
  Button,
  Paper,
  Grid,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  LabelList,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import { useSales } from "../hooks/useSales";
import { useState } from "react";

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

export const HomePage = () => {
  const [isDaySelected, setIsDaySelected] = useState(false);
  const {
    salesByDayQuery,
    salesByMonthQuery,
    salesByProductQuery,
    salesByCategoryQuery,
  } = useSales();

  return (
    <>
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        sx={{
          backgroundColor: "#EEF4FA",
        }}
        // alignItems="center"
        // justifyContent="space-evenly"
      >
        <Typography
          variant="h5"
          sx={{
            alignSelf: "center",
            marginBottom: 3,
            marginTop: 1,
            pl: 4,
          }}
        >
          Página de Inicio
        </Typography>

        {salesByDayQuery.isLoading && salesByMonthQuery.isLoading ? (
          <Box
            sx={{
              height: "100%",
              width: "100%",
              display: "flex",
            }}
          >
            Cargando Información...
          </Box>
        ) : (
          //   <Box >

          <Grid container spacing={2} pl={4}>
            <Grid
              item
              id="line-chart"
              xs={12}
              component={Paper}
              sx={{
                boxShadow: 3,
                mx: 2,
                mb: 2,
                py: 2,
              }}
            >
              {/* <ResponsiveContainer width={"40%"} height={"50%"}> */}

              <Grid container>
                <Grid item xs={12} md={10}>
                  <ResponsiveContainer width={"100%"} height={270}>
                    <LineChart
                      // width={800}
                      // height={270}
                      data={
                        isDaySelected
                          ? salesByDayQuery.data
                          : salesByMonthQuery.data
                      }
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey={`${isDaySelected ? "day" : "month"}`} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="total"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                        name="Monto Total de la Venta (S./)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={2}
                  py={5}
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"center"}
                  justifyContent="space-evenly"
                >
                  <Typography variant="h6">Resumen por: </Typography>

                  <Box display="flex" gap={2}>
                    <ToolTipMui title="Cambiar a ventas por mes">
                      <Button
                        variant="contained"
                        onClick={() => setIsDaySelected(false)}
                      >
                        Mes
                      </Button>
                    </ToolTipMui>
                    <ToolTipMui title="Cambiar a ventas por día">
                      <Button
                        variant="contained"
                        onClick={() => setIsDaySelected(true)}
                      >
                        Día
                      </Button>
                    </ToolTipMui>
                  </Box>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              item
              xs={6}
              sm={6}
              id="bar-chart"
              component={Paper}
              sx={{
                mx: 2,
                height: 250,
                boxShadow: 3,
              }}
            >
              <ResponsiveContainer width={"100%"} height={"100%"}>
                <BarChart
                  data={salesByProductQuery.data}
                  margin={{
                    top: 30,
                    right: 10,
                    left: 0,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend
                    content={() => (
                      <Box>Total de ventas por Producto (S./)</Box>
                    )}
                    wrapperStyle={{
                      width: "100%",
                      textAlign: "center",
                      bottom: 10,
                      left: 0,
                    }}
                  />
                  <Bar dataKey="total" fill="#8884d8">
                    {salesByProductQuery.data?.map((_, index) => (
                      <>
                        <LabelList
                          key={`bar-label-${index}`}
                          dataKey="total"
                          position="top"
                        />
                        <Cell
                          key={`bar-cell-${index}`}
                          fill={colors[index % 20]}
                        />
                      </>
                    ))}
                  </Bar>
                  {/* <Bar dataKey="quantity" fill="#82ca9d" /> */}
                </BarChart>
              </ResponsiveContainer>
            </Grid>

            <Grid
              item
              xs={6}
              sm={5.3}
              id="pie-chart"
              component={Paper}
              sx={{
                mx: 2,
                height: 250,
                boxShadow: 3,
              }}
            >
              <ResponsiveContainer width={"100%"} height={"100%"}>
                <PieChart>
                  <Pie
                    data={salesByCategoryQuery.data}
                    // cx={235}
                    // cy={100}
                    labelLine={false}
                    outerRadius={55}
                    fill="#8884d8"
                    dataKey="total"
                    label={({ name, total }) => `${name} - S/. ${total}`}
                  >
                    {salesByCategoryQuery.data?.map((category, index) => (
                      <Cell
                        key={`${category.name}-${index}`}
                        fill={colors[index % 20]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend
                    content={() => (
                      <Box>Total de ventas por Categoría (S./)</Box>
                    )}
                    wrapperStyle={{
                      width: "100%",
                      textAlign: "center",
                      bottom: 10,
                      left: 0,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Grid>

            {/* </ResponsiveContainer> */}
            <Grid item xs={12}>
              <Box
                component={Paper}
                sx={{
                  boxShadow: 3,
                  mb: 2,
                  p: 2,
                }}
              >
                <Typography>
                  <b>Nota:</b> Los datos mostrados en esta página son ficticios
                  y no corresponden a la realidad.
                </Typography>
              </Box>
            </Grid>
          </Grid>
          //   </Box>
        )}
      </Box>
    </>
  );
};
