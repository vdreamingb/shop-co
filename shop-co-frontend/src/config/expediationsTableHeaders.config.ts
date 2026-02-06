import { IHeadersConfig } from "@/shared/types/headersConfig.type";

export const ExpediationsTableHeaders: IHeadersConfig[] = [
    {
        header: "id",
        displayName: "ID",
    },
    {
        header: "address",
        displayName: "Address"
    },
    {
        header: "phoneNumber",
        displayName: "PhoneNumber"
    },
    {
        header: "userId",
        displayName: "User ID"
    },
    {
        header: "createdAt",
        displayName: "Created At"
    },
    {
        header: "status",
        displayName: "Status"
    },
    {
        header: "cost",
        displayName: "Cost"
    }
]

export const ExpediationsItemsTableHeaders:IHeadersConfig[] = [
    {
        header: "id",
        displayName: "ID"
    },
    {
        header: "expediationId",
        displayName: "Expediation ID"
    },
    {
        header: "productId",
        displayName: "Product ID"
    },
    {
        header: "quantity",
        displayName: "Quantity"
    },
    {
        header: "unitPrice",
        displayName: "Unit Price"
    },
    {
        header: "detailsId",
        displayName: "Details ID"
    }
]