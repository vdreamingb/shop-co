import { IHeadersConfig } from "@/shared/types/headersConfig.type";

export const productsTableHeaders:IHeadersConfig[] = [
    {
        header: 'id',
        displayName: 'ID'
    },
    {
        header: 'name',
        displayName: 'Name'
    },
    {
        header: 'description',
        displayName: 'Description'
    },
    {
        header: 'price',
        displayName: 'Price'
    },
    {
        header: 'brand',
        displayName: 'Brand'
    },
    {
        header: 'createdAt',
        displayName: 'Created At'
    },
    {
        header: 'updatedAt',
        displayName: 'Updated At'
    },
    {
        header: 'imageUrl',
        displayName: 'Image URL'
    }
]