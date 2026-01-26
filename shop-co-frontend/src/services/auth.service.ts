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
            await axios.post("http://localhost:1110/api/auth/refresh",{},{ withCredentials: true })
        }
        catch(error){
            console.log(error)
        }
    }

    async loggedIn(){
        try {
            const res = await axios.get("http://localhost:1110/api/auth/logged", {withCredentials: true})
            if(!res.data.logged){
                return false
            }
            return true
        } catch (error) {
            console.error(error)
        }
    }
}

export const authService = new AuthService()