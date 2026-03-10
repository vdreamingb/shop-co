"use client"

import ProductsView from "@/components/shop/shop/ProductsView";
import TopPart from "@/components/shop/shop/TopPart";
import { productsService } from "@/services/products.service";
import { HistoryContext } from "@/shared/contexts/HistoryContext"
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react"

export default function ShopPage(): React.JSX.Element {
    const {setHistory} = useContext(HistoryContext);
    const { data: products = [] } = useQuery({queryKey: ["products"], queryFn: async () => {
        return await productsService.getAllProducts();
    }})
    useEffect(() => {
        setHistory((prev) => [{label: "Shop", href: "/shop"}])
    },[setHistory])
    return <div className="w-full">
        <TopPart title="Shop"/>
        <ProductsView data={products} />
    </div>
}