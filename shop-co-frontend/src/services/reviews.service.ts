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

  async createReview(
    data: Omit<ICreateReviews, "productId">,
    productId: number,
  ) {
    try {
      await api.post("reviews/create", {
        productId: Number(productId),
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

  async getAverageRating(productId: number) {
    try {
      const res = await api.get(`reviews/product/${productId}/average-rating`);
      return res.data;
    } catch (error) {
      handleError(error);
      return 0;
    }
  }

  async getReviewsByProductId(productId: number): Promise<IReview[] | []> {
    try {
      const res = await api.get(`reviews/product/${productId}`);
      return res.data;
    } catch (error) {
      handleError(error);
      return [];
    }
  }
}
export const reviewsService = new ReviewsService();
