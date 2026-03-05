"use client"

import useAuthRefresh from "@/custom-hooks/auth.hook";

export default function ProfilePage(){
    const ready = useAuthRefresh()

    if(!ready){
        return <>Loading...</>
    }
    return <div className="">
        Hello dear user
    </div>
}