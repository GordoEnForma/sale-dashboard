import { useMutation, useQuery } from "@tanstack/react-query"
import { Sale, getSales } from "../api/sales"


type monthResult = {
    month: string;
    total: number;
};

type dayResult = {
    day: string;
    total: number;
};

type productResult = {
    name: string;
    total: number;
    quantity: number;
};

type categoryResult = {

    name: string;
    total: number;

}

export const useSales = () => {
    const salesQuery = useQuery(['sales'], getSales, {
        staleTime: 1000 * 60 * 60,
    })
    // const saleMutation = useMutation(['sales'], (sale) => {
    //     console.log(sale)
    // })

    const salesByMonthQuery = useQuery(['sales', 'byMonth'], () => {
        const salesByMonth = salesQuery.isLoading ? [] : salesQuery.data
            ?.reduce<monthResult[]>((result, sale) => {
                const date = sale.saleDate;
                const month = `${date.getFullYear()}-${date.getMonth() + 1}`;
                const total = sale.totalSaleAmount;
                const existingSale = result.find((s) => s.month === month);
                if (existingSale) {
                    existingSale.total += total;
                } else {
                    result.push({ month, total });
                }
                return result;
            }, [])
            .sort((a, b) => {
                const aDate = new Date(a.month);
                const bDate = new Date(b.month);
                return aDate.getTime() - bDate.getTime();
            });

        return salesByMonth;
    }, {
        staleTime: 1000 * 60 * 60,
        enabled: salesQuery.data !== undefined,
    }
    )

    const salesByDayQuery = useQuery(['sales', 'byDay'], () => {
        const salesByDay = salesQuery.isLoading ? [] : salesQuery.data
            ?.reduce<dayResult[]>((result, sale) => {
                const date = sale.saleDate;
                const day = `${date.getFullYear()}-${date.getMonth() + 1
                    }-${date.getDate()}`;
                const total = sale.totalSaleAmount;
                const existingSale = result.find((s) => s.day === day);
                if (existingSale) {
                    existingSale.total += total;
                } else {
                    result.push({ day, total });
                }
                return result;
            }, [])
            .sort((a, b) => {
                const aDate = new Date(a.day);
                const bDate = new Date(b.day);
                return aDate.getTime() - bDate.getTime();
            })

        return salesByDay;
    }, {
        staleTime: 1000 * 60 * 60,
        enabled: salesQuery.data !== undefined,
    })


    const salesByProductQuery = useQuery(['sales', 'byProducts'], () => {
        const salesByProduct = salesQuery.data?.reduce<productResult[]>((result, sale) => {
            sale.productsSold.forEach((product) => {
                const name = product.name;
                const total = product.saleAmount;
                const quantity = product.quantity;
                const existingSale = result.find((s) => s.name === name);
                if (existingSale) {
                    existingSale.total += total;
                    existingSale.quantity += quantity;

                } else {
                    result.push({ name, total, quantity });
                }
            });
            return result;
        }, []);

        return salesByProduct;
    }, {
        staleTime: 1000 * 60 * 60,
        enabled: salesQuery.data !== undefined,
    })
    const salesByCategoryQuery = useQuery(['sales', 'byCategory'], () => {
        const salesByCategory = salesQuery.data?.reduce<categoryResult[]>((result, sale) => {
            sale.productsSold.forEach((product) => {
                const total = product.saleAmount;
                const name = product.category;
                const existingSale = result.find((s) => s.name === name);
                if (existingSale) {
                    existingSale.total += total;

                } else {
                    result.push({ total, name });
                }
            });
            return result;
        }, []);

        return salesByCategory;
    }, {
        staleTime: 1000 * 60 * 60,
        enabled: salesQuery.data !== undefined,
    })

    const mutateSale = useMutation(async (sale) => {
        console.log(sale)
        return sale;
    }, {
        onSuccess: (data, variables) => {
            console.log(data);
            console.log(variables);
        }
    })


    return {
        salesQuery,
        salesByMonthQuery,
        salesByDayQuery,
        salesByProductQuery,
        salesByCategoryQuery,
        mutateSale,
    }
}