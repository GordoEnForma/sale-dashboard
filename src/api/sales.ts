import { randomDate } from "../utils/generateDate";

export type Sale = {
    id?: number | string;
    client: string,
    productsSold: {
        id?: string,
        name: string,
        saleAmount: number,
        category: string,
        quantity: number,
    }[]
    totalSaleAmount: number,
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
                    productsSold: [
                        {
                            id: '1',
                            name: 'Product 1',
                            quantity: 1,
                            category: 'Category 1',
                            saleAmount: 100,
                        },
                        {
                            id: '2',
                            name: 'Product 2',
                            quantity: 1,
                            category: 'Category 2',
                            saleAmount: 200,
                        },
                    ],
                    totalSaleAmount: 300,
                    saleDate: randomDate(2019, 2023),
                    updateAt: randomDate(2019, 2023),
                },
                {
                    id: 2,
                    client: 'Client 2',
                    productsSold: [
                        {
                            id: '3',
                            name: 'Product 2',
                            category: 'Category 2',
                            quantity: 2,
                            saleAmount: 400,
                        },
                        {
                            id: '4',
                            name: 'Product 3',
                            category: 'Category 1',
                            quantity: 4,
                            saleAmount: 1200,
                        },
                    ],
                    totalSaleAmount: 1600,
                    saleDate: randomDate(2019, 2023),
                    updateAt: randomDate(2019, 2023),
                },
                {
                    id: 3,
                    client: 'Client 2',
                    productsSold: [
                        {
                            id: '5',
                            name: 'Product 1',
                            category: 'Category 1',
                            quantity: 10,
                            saleAmount: 1000,
                        },
                        {
                            id: '6',
                            name: 'Product 2',
                            category: 'Category 2',
                            quantity: 1,
                            saleAmount: 200,
                        },
                        {
                            id: '7',
                            name: 'Product 3',
                            category: 'Category 1',
                            quantity: 1,
                            saleAmount: 300,
                        },
                    ],
                    totalSaleAmount: 1500,
                    saleDate: randomDate(2019, 2023),
                    updateAt: randomDate(2019, 2023),
                },
                {
                    id: 4,
                    client: 'Client 4',
                    productsSold: [
                        {
                            id: '8',
                            name: 'Product 1',
                            category: 'Category 1',
                            quantity: 2,
                            saleAmount: 200,
                        },
                        {
                            id: '9',
                            name: 'Product 4',
                            category: 'Category 2',
                            quantity: 1,
                            saleAmount: 400,
                        },
                    ],
                    totalSaleAmount: 600,
                    saleDate: randomDate(2019, 2023),
                    updateAt: randomDate(2019, 2023),
                },
                {
                    id: 5,
                    client: 'Client 4',
                    productsSold: [
                        {
                            id: '10',
                            name: 'Product 5',
                            category: 'Category 3',
                            quantity: 2,
                            saleAmount: 1000,
                        },
                        {
                            id: '11',
                            name: 'Product 3',
                            category: 'Category 1',
                            quantity: 2,
                            saleAmount: 600,
                        },
                        {
                            id: '12',
                            name: 'Product 2',
                            category: 'Category 2',
                            quantity: 1,
                            saleAmount: 200,
                        },
                    ],
                    totalSaleAmount: 1800,
                    saleDate: randomDate(2019, 2023),
                    updateAt: randomDate(2019, 2023),
                },
                {
                    id: 6,
                    client: 'Client 5',
                    productsSold: [
                        {
                            id: '13',
                            name: 'Product 1',
                            category: 'Category 1',
                            quantity: 14,
                            saleAmount: 1400,
                        },
                        {
                            id: '14',
                            name: 'Product 3',
                            category: 'Category 1',
                            quantity: 3,
                            saleAmount: 900,
                        },
                    ],
                    totalSaleAmount: 2300,
                    saleDate: randomDate(2019, 2023),
                    updateAt: randomDate(2019, 2023),
                },
                {
                    id: 7,
                    client: 'Client 4',
                    productsSold: [
                        {
                            id: '15',
                            name: 'Product 1',
                            category: 'Category 1',
                            quantity: 13,
                            saleAmount: 1300,
                        },
                        {
                            id: '16',
                            name: 'Product 2',
                            category: 'Category 2',
                            quantity: 9,
                            saleAmount: 1800,
                        },
                    ],
                    totalSaleAmount: 3100,
                    saleDate: randomDate(2019, 2023),
                    updateAt: randomDate(2019, 2023),
                },
                {
                    id: 8,
                    client: 'Client 5',
                    productsSold: [
                        {
                            id: '17',
                            name: 'Product 1',
                            category: 'Category 1',
                            quantity: 1,
                            saleAmount: 100,
                        },
                        {
                            id: '18',
                            name: 'Product 2',
                            category: 'Category 2',
                            quantity: 1,
                            saleAmount: 200,
                        },
                        {
                            id: '19',
                            name: 'Product 3',
                            category: 'Category 1',
                            quantity: 1,
                            saleAmount: 300,
                        },
                        {
                            id: '20',
                            name: 'Product 5',
                            category: 'Category 3',
                            quantity: 4,
                            saleAmount: 2000,
                        },
                    ],
                    totalSaleAmount: 2600,
                    saleDate: randomDate(2019, 2023),
                    updateAt: randomDate(2019, 2023),
                },
                {
                    id: 9,
                    client: 'Client 8',
                    productsSold: [
                        {
                            id: '21',
                            name: 'Product 1',
                            category: 'Category 1',
                            quantity: 30,
                            saleAmount: 3000,
                        },

                    ],
                    totalSaleAmount: 3000,
                    saleDate: randomDate(2019, 2023),
                    updateAt: randomDate(2019, 2023),
                },
                {
                    id: 10,
                    client: 'Client 3',
                    productsSold: [
                        {
                            id: '22',
                            category: 'Category 1',
                            name: 'Product 1',
                            quantity: 11,
                            saleAmount: 1100,
                        },
                        {
                            id: '23',
                            name: 'Product 2',
                            category: 'Category 2',
                            quantity: 6,
                            saleAmount: 1200,
                        },
                    ],
                    totalSaleAmount: 2300,
                    saleDate: randomDate(2019, 2023),
                    updateAt: randomDate(2019, 2023),
                },

            ])
        }, 500)


    },)
}