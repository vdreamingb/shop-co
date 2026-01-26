"use client"

import { useForm } from "react-hook-form"

export default function SearchForm():React.JSX.Element{
    const {register, handleSubmit} = useForm()
    return <form className="bg-[#F0F0FF] py-2.5 px-4 max-w-2xs rounded-3xl flex items-center gap-1 hover:bg-[#E0E0FF] duration-300 ease-in-out">
        <img src="/img/search.svg" alt="" />
        <input type="text" className="px-2.5 w-full focus:outline-0 placeholder:text-[rgb(0,0,0,0.4)]" placeholder="Search here..." />
    </form>
}