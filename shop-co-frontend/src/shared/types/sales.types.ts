export interface ISales{
    id: number
    productId: number
    salesPercent: number
    saleDate: string
    expiryDate: string
}

export interface ICreateSales { 
    productId: number,
    salesPercent: number,
    salesStartDate?: string,
    expiryDate?: string
}