

export type Sale = {
    id: number;
    client: string,
    products: {
        id: number,
        name: string,
        quantity: number,
        price: number,
    }[]
    saleAmount: number,
    saleDate: Date,
    updateAt: Date,

}


export const getSales = async (): Promise<Sale[]> => {
    return new Promise((res, _) => {

        setTimeout(() => {
            res([
                {
                    id: 1,
                    client: 'Client 1',
                    products: [
                        {
                            id: 1,
                            name: 'Product 1',
                            quantity: 1,
                            price: 100,
                        },
                        {
                            id: 2,
                            name: 'Product 2',
                            quantity: 1,
                            price: 500,
                        },
                    ],
                    saleAmount: 600,
                    saleDate: new Date(),
                    updateAt: new Date(),
                },
                // Generate 10 more sales with random products and correct saleAmount that is equal to quantity*price
                ...Array.from({ length: 10 }, (_, i) => ({
                    id: i + 2,
                    client: `Client ${i + 2}`,
                    products: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, (_, j) => ({
                        id: j + 1,
                        name: `Product ${j + 1}`,
                        quantity: Math.floor(Math.random() * 5) + 1,
                        price: Math.floor(Math.random() * 1000) + 1,
                    })),
                    saleAmount: 0,
                    saleDate: new Date(),
                    updateAt: new Date(),
                })).map((sale) => ({
                    ...sale,
                    saleAmount: sale.products.reduce((acc, product) => acc + product.quantity * product.price, 0),
                })),
            ])
        }, 500)


    },)
}