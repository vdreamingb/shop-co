"use client"

import Image from "next/image"
import { useForm } from "react-hook-form"

export default function SearchForm(): React.JSX.Element {
  const { register, handleSubmit } = useForm()

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-[#F0F0FF] py-2.5 px-4 w-full rounded-3xl
      max-xl:max-w-110 max-lg:max-w-100 flex items-center gap-1 
      hover:bg-[#E0E0FF] duration-300 ease-in-out max-md:bg-transparent max-md:gap-0 max-md:w-min"
    >
      <button type="submit" className="shrink-0">
        <Image
          width={24}
          height={24}
          src="/img/search.svg"
          alt="Search"
        />
      </button>
      <input
        {...register("search")}
        type="text"
        className="px-2.5 w-full focus:outline-0 placeholder:text-[rgb(0,0,0,0.4)] max-md:hidden"
        placeholder="Search here..."
      />
    </form>
  )
}