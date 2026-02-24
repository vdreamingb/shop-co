import { productsService } from "@/services/products.service"
import { ICreateProduct } from "@/shared/types/product.types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Image from "next/image"
import { Dispatch, SetStateAction } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

interface Props{
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

export default function CreateProductForm({setIsOpen}:Props): React.JSX.Element{
    const {register, formState:{errors}, handleSubmit} = useForm<ICreateProduct>()

    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: async (data: ICreateProduct) => {
            await productsService.createProduct(data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['products']})
        }
    })

    const onSubmit: SubmitHandler<ICreateProduct> = async (data) => {
        mutation.mutate(data)
        setIsOpen(false)
    }

    return <form onSubmit={handleSubmit(onSubmit)}>
        <label className="form-label" htmlFor="name">Name</label>
        <input className="form-input mb-5 mt-2" type="text" placeholder="Jeans" {...register("name", {minLength: 4, required: true})} />
        <label className="form-label" htmlFor="description">Description</label>
        <textarea className="form-input mb-5 mt-2 h-40" id="" placeholder="Write something..." {...register("description", {minLength: 4, required: true})}></textarea>
        <label className="form-label" htmlFor="price">Price</label>
        <input className="form-input mb-5 mt-2" type="number" placeholder="500" {...register("price", {required: true})}/>
        <label className="form-label" htmlFor="brand">Brand</label>
        <input type="text" className="form-input mb-5 mt-2" placeholder="Nike" />
        <label className="form-label" htmlFor="image">Image</label>
        <div className="flex items-center justify-between">
            <div className="relative mb-5 mt-2 flex items-center justify-center max-w-10 cursor-pointer bg-black rounded-full">
                <Image className="absolute" src="/img/plus.svg" alt="" width={20} height={20}/>
                <input type="file" {...register("image")} id="" className=" w-10 bg-transparent z-30 h-10 text-transparent    cursor-pointer" />
            </div>
        </div>
        <button type="submit" className="submit-form ">Create</button>
    </form>
}
