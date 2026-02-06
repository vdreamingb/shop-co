import { IHeadersConfig } from "@/shared/types/headersConfig.type";

export const reviewsTableHeadersConfig:IHeadersConfig[] = [
    {
        header: "id",
        displayName: "ID"
    },
    {
        header: "userId",
        displayName: "User ID"
    },
    {
        header: "productId",
        displayName: "ProductID"
    },
    {
        header: "rating",
        displayName: "Rating"
    },
    {
        header: "comment",
        displayName: "Comment"
    },
    {
        header: "createdAt",
        displayName: "Created At"
    },
    {
        header: "updatedAt",
        displayName: "Updated At"
    }
]