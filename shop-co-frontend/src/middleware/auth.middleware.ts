import { authService } from "@/services/auth.service";
import { redirect } from "next/navigation";

export async function AuthMiddleware(){
    const res = await authService.loggedIn()
    if(res){
        await authService.refresh()
        redirect("/admin")
    }
    else{
        redirect("/login")
    }
}
