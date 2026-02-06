import api from "@/config/axios.config"
import { IReview } from "@/shared/types/reviews.types"

class ReviewsService{
    async getAll(): Promise<IReview[] | []>{
        try {
            const res = await api.get("reviews/all")
            return res.data
        } catch (error) {
            if(error instanceof Error){
                alert(error.message)
                return []
            }
            return []            
        }
    }
}

export const reviewsService = new ReviewsService()