import { useMutation, useQuery } from "@tanstack/react-query"
import { getProducts } from "../api/products"

export const useProduct = () => {

    const productsQuery = useQuery(['products'], getProducts, {
        staleTime: 1000 * 60,
    })
    // const productMutation = useMutation(["products"], (product) => {
    //     console.log(product)
    // })

    return {
        productsQuery
    }

}