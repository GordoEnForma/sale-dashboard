import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Sale } from "../api/sales";
export const useMutateSale = () => {

    const queryClient = useQueryClient();
    const addSale = useMutation(['sales'], async (sale: Sale) => {
        console.log(sale)
    }, {
        onSuccess: (data, variables) => {
            console.log('success')
            console.log(variables)
            // queryClient.invalidateQueries(['sales'])
            queryClient.setQueryData(['sales'], (oldData: Sale[]) => {
                return [variables, ...oldData]

            })
            queryClient.invalidateQueries(["sales", "byProducts"]);
            queryClient.invalidateQueries(["sales", "byCategory"]);
            queryClient.invalidateQueries(["sales", "byDay"]);
            queryClient.invalidateQueries(["sales", "byMonth"]);
        }

    })

    const removeSale = async (id: string) => {
        console.log(id);
        queryClient.setQueryData(['sales'], (oldData: Sale[]) => {
            // console.log(id)
            return oldData.filter((sale) => {
                // console.log(sale.id, id);
                return sale.id !== Number(id);
            })
        })
        queryClient.invalidateQueries(["sales", "byProducts"]);
        queryClient.invalidateQueries(["sales", "byCategory"]);
        queryClient.invalidateQueries(["sales", "byDay"]);
        queryClient.invalidateQueries(["sales", "byMonth"]);
    }


    const updateSale = async (sale: Sale) => {
        console.log(sale)
        queryClient.setQueryData(['sales'], (oldData: Sale[]) => {
            return oldData.map((s) => {
                if (s.id === sale.id) {
                    console.log('found sale');
                    return sale;
                }
                return s;
            })
        })
        queryClient.invalidateQueries(["sales", "byProducts"]);
        queryClient.invalidateQueries(["sales", "byCategory"]);
        queryClient.invalidateQueries(["sales", "byDay"]);
        queryClient.invalidateQueries(["sales", "byMonth"]);
    }

    return { addSale, removeSale, updateSale }
}