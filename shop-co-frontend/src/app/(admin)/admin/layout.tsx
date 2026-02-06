"use client"

import useAuthRefresh from "@/custom-hooks/auth.hook";

export default function AdminPagesLayout({children}: {children: React.ReactNode}){
    // const ready = useAuthRefresh();

    // if(!ready){
    //     return <>Loading ...</>
    // }

    return <>
        {children}
    </>
}