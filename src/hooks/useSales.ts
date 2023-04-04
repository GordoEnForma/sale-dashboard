import { useQuery } from "@tanstack/react-query"
import { getSales } from "../api/sales"



export const useSales = () => {
    const salesQuery = useQuery(['sales'], getSales, {
        staleTime: 1000 * 60,
    })
    // const saleMutation = useMutation(['sales'], (sale) => {
    //     console.log(sale)
    // })
    return {
        salesQuery,
        // saleMutation,
    }
}
