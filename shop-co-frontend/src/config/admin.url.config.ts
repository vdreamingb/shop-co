import { IUrl } from "@/shared/types/url.type";

export const ADMIN_URL_CONFIG: IUrl[] = [
    {
        id: 1,
        name: "Users",
        path: "/admin/users"
    },
    {
        id: 2,
        name: "Products",
        path: "/admin/products"
    },
    {
        id: 3,
        name: "Product Details",
        path: "/admin/details"
    },
    {
        id: 4,
        name: "Sales",
        path: "/admin/sales"
    },
    {
        id: 5,
        name: "Expediations",
        path: "/admin/expediations"
    },
    {
        id: 7,
        name: "ExpdiationItems",
        path: "/admin/expediations/items"
    },
    {
        id: 8,
        name: "Reviews",
        path: "/admin/reviews"
    }
]