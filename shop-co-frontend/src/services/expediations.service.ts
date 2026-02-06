import api from "@/config/axios.config";
import { IExpediation, IExpediationItem } from "@/shared/types/expediation.types";

class ExpediationsService{
    async getAll():Promise<IExpediation[] | []>{
        try {
            const res = await api.get("expediations/all")
            return res.data
        } catch (error) {
            if(error instanceof Error){
                alert(error.message)
                return []
            }
            alert("Unknown error occured")
            return []  
        }
    }

    async getAllExpediationsItems():Promise<IExpediationItem[] | []>{
        try {
            const res = await api.get("expediation-items/all")
            return res.data
        } catch (error) {
            if(error instanceof Error){
                alert(error.message)
                return []
            }
            alert("Unknown error occured")
            return []  
        }
    }
}

export const expediationsService = new ExpediationsService()