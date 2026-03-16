import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
    title: "Product",
    description: "Product page",
}

export default function ProductLayout({children}: {children: ReactNode}){
    return <>
        {children}
    </>
}