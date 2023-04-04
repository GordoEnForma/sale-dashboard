type Product = {
    id: number;
    name: string;
    price: number;
}

export const getProducts = async (): Promise<Product[]> => {
    return new Promise((resolve, _) => {
        setTimeout(() => {
            resolve(
                [
                    {
                        id: 1,
                        name: 'Product 1',
                        price: 100,
                    },
                    {
                        id: 2,
                        name: 'Product 2',
                        price: 500,
                    },
                    {
                        id: 3,
                        name: 'Product 3',
                        price: 500,
                    },
                    {
                        id: 4,
                        name: 'Product 4',
                        price: 500,
                    },
                    {
                        id: 5,
                        name: 'Product 5',
                        price: 500,
                    },
                ]
            )
        }, 500)
    })
}


