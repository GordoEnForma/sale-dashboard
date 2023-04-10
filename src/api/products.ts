export type Product = {
    id?: number | string;
    name: string;
    price: number;
    category: string;
}

export const getProducts = async (): Promise<Product[]> => {
    return new Promise((resolve, _) => {
        setTimeout(() => {
            resolve(
                [
                    {
                        id: 1,
                        name: 'Product 1',
                        category: 'Category 1',
                        price: 100,
                    },
                    {
                        id: 2,
                        name: 'Product 2',
                        category: 'Category 2',
                        price: 200,

                    },
                    {
                        id: 3,
                        name: 'Product 3',
                        category: 'Category 1',
                        price: 300,
                    },
                    {
                        id: 4,
                        name: 'Product 4',
                        category: 'Category 2',
                        price: 400,
                    },
                    {
                        id: 5,
                        name: 'Product 5',
                        category: 'Category 3',
                        price: 500,
                    },
                ]
            )
        }, 500)
    })
}


