import { IHeadersConfig } from "@/shared/types/headersConfig.type";

export const SalesTableHeaders:IHeadersConfig[] = [
    {
        header: "id",
        displayName: "ID"
    },{
        header: "productId",
        displayName: "Product ID"
    },
    {
        header: "salesPercent",
        displayName: "Sales percent"
    },
    {
        header: "saleDate",
        displayName: "Sales Start Date"
    },
    {
        header: "expiryDate",
        displayName: "Expiry Date"
    }
]