import api from "@/config/axios.config";
import { ISales } from "@/shared/types/sales.types";

class SalesService{
    async getAll():Promise<ISales | []>{
        try {
            const res = await api.get("sales/all")
            const data = res.data
            return data
        } catch (error) {
            alert("An error occured")
            return []
        }
    }
}

export const salesService = new SalesService()