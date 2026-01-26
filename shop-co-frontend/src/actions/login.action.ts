"use server"

import { authService } from "@/services/auth.service"
import type { ILogIn } from "@/shared/types/login.type"

export default async function loginAction({email, password}: ILogIn){
    return await authService.login(email, password)
}