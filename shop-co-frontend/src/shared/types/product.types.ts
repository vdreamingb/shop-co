export interface IProduct {
    id: number,
    name: string,
    description: string,
    price: number,
    brand: string,
    imageUrl: string,
    createdAt: string,
    updatedAt: string
}

export interface ICreateProduct{
    name: string
    description?: string
    price: number
    brand?: string,
    image: FileList
}