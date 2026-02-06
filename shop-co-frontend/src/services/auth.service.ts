import axios from "axios";

class AuthService{
    async login(email: string, password: string){
        try {
            const response = await axios.post("http://localhost:1110/api/auth/login", {
                email,
                password
            }, {withCredentials:true})
            return response.status
        } catch (error) {
            if(error instanceof Error){
                alert(error.message)
            }
            alert("Unknown error occured")
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
            console.error(error)
        }
    }

    async whoamI(){
        try {
            const res = await axios.get("http://localhost:1110/api/auth/whoami", {withCredentials: true})
            return res.data
        } catch (error) {
            console.error(error)
        }
    }

    async logout(){
        try {
            const res = await axios.post("http://localhost:1110/api/auth/logout", {}, {withCredentials: true})
            return res.status
        } catch (error) {
            console.error(error)
        }
    }
}

export const authService = new AuthService()