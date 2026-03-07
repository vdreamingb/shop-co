import { ISignUp } from "@/shared/types/signup.type";
import axios from "axios";
import { handleError } from "@/shared/utils/handleError";
import api from "@/config/axios.config";

class AuthService{
    async login(email: string, password: string){
        try {
            const response = await axios.post("http://localhost:1110/api/auth/login", {
                email,
                password
            }, {withCredentials:true})
            return response.status
        } catch (error) {
            handleError(error)
        }
    }

    async refresh(){
        try{
            const res = await axios.post("http://localhost:1110/api/auth/refresh",{},{ withCredentials: true })
            return res.status
        }
        catch(error){
            console.log(error)
        }
    }

    async loggedIn(){
        try {
            const res = await axios.get("http://localhost:1110/api/auth/logged", {withCredentials: true})
            return res.data
        } catch (error) {
            handleError(error)
        }
    }

    async whoamI(){
        try {
            const res = await axios.get("http://localhost:1110/api/auth/whoami", {withCredentials: true})
            return res.data
        } catch (error) {
            handleError(error)
            throw new Error("User not authenticated");
        }
    }

    async logout(){
        try {
            const res = await axios.post("http://localhost:1110/api/auth/logout", {}, {withCredentials: true})
            return res.status
        } catch (error) {
            handleError(error);
        }
    }

    async signup(data:ISignUp){
        try {
            const res = await api.post("auth/register", {data})
            return res.status
        } catch (error) {
            handleError(error);
        }
    }
}

export const authService = new AuthService()