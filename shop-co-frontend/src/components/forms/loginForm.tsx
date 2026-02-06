"use client"

import loginAction from "@/actions/login.action"
import { ILogIn } from "@/shared/types/login.type"
import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import { redirect } from "next/navigation"
import { authService } from "@/services/auth.service"

export default function LoginForm(){
    const {register, handleSubmit, formState: { errors }} = useForm<ILogIn>()
    
    const onSubmit: SubmitHandler<ILogIn> = async (data) => {
        const res = await authService.login(data.email, data.password)
        if(res === 200){
            redirect("/admin")
        }
    }
    
    return <form onSubmit={handleSubmit(onSubmit)} className="mt-9 text-center flex items-center flex-col gap-4">
        <input type="email" {...register("email", {required: true, minLength:4, pattern: /^\S+@\S+\.\S+$/})} className="form-input focus:outline-none" placeholder="Email"/>
        {errors.email && <p className="text-red-500">Email is not valid.</p>}
        <input type="password" {...register("password", {required: true, minLength: 6/*, pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/*/})} className="form-input focus:outline-none" placeholder="Password"/>
        {errors.password && <p className="text-red-500">Password must contain one uppercase letterone number and be longer than 6 characters.</p>}
        <button className="bg-black px-16 text-white py-2 rounded-2xl block text-lg hover:bg-neutral-800 cursor-pointer duration-300 ease-in-out font-medium" type="submit">
            Log In
        </button>
    </form>
}