"use client"

import {useContext, useEffect} from "react";
import { productsService } from "@/services/products.service";
import { HistoryContext } from "@/shared/contexts/HistoryContext"
import { useQuery } from "@tanstack/react-query";
import ProductsView from "@/components/shop/shop/ProductsView";
import TopPart from "@/components/shop/shop/TopPart";

export default function NewArrivalsPage(): React.JSX.Element {
    const {setHistory} = useContext(HistoryContext);
    const { data: products = [] } = useQuery({queryKey: ["products"], queryFn: async () => {
        return await productsService.getNewArrivals();
    }})

    useEffect(() => {
        setHistory([{label: "Shop", href: "/shop"}, {label: "New Arrivals", href: "/shop/new-arrivals"}])
    }, [setHistory])

    return <div className="">
        <TopPart title="New Arrivals"/>
        <ProductsView data={products} />
    </div>
}