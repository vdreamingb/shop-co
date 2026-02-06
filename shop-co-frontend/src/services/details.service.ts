import api from "@/config/axios.config";
import { IDetails } from "@/shared/types/details.types";

class DetailsService{
    async getAll():Promise<IDetails[] | []>{
        try {
            const res = await api.get('details/all')
            return res.data
        } catch (error) {
            console.log("An error occured")
            return []
        }
    }
}

export const detailsService = new DetailsService()