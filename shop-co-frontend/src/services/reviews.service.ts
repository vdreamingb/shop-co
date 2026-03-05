import api from "@/config/axios.config";
import { ICreateReviews, IReview } from "@/shared/types/reviews.types";
import { handleError } from "@/shared/utils/handleError";

class ReviewsService {
  async getAll(): Promise<IReview[] | []> {
    try {
      const res = await api.get("reviews/all");
      return res.data;
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
        return [];
      }
      return [];
    }
  }

  async createReview(data: ICreateReviews) {
    try {
      await api.post("reviews/create", {
        productId: Number(data.productId),
        rating: Number(data.rating),
        comment: data.comment,
      });
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Unknown error occured");
      }
    }
  }

  async deleteReview(id: number) {
    try {
      await api.delete(`reviews/delete/${id}`);
    } catch (error) {
      handleError(error);
    }
  }
}

export const reviewsService = new ReviewsService();
