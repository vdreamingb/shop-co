import { IUser } from "@/shared/types/user.types";
import axios from "axios";

class UserService{
    async getUsers(): Promise<IUser | any[]> {
        try {
            const res = await axios.get('http://localhost:1110/api/users', {withCredentials: true});
            const data = res.data
            return data;
        } catch (error) {
            if(error instanceof Error){
                alert(error.message);
            }
            alert("Unknown error occured");
            return [];
        }
    }
}

export const userService = new UserService();