import api from "@/config/axios.config";
import { ICreateDetails, IDetails } from "@/shared/types/details.types";
import { handleError } from "@/shared/utils/handleError";

class DetailsService {
  async getAll(): Promise<IDetails[] | []> {
    try {
      const res = await api.get("details/all");
      return res.data;
    } catch (error) {
      handleError(error);
      return [];
    }
  }

  async createDetail(data: ICreateDetails) {
    try {
      await api.post("details/create", {
        productId: Number(data.productId),
        color: data.color,
        size: data.size,
        type: data.type,
        gender: data.gender,
        style: data.style,
        stock: Number(data.stock),
        pricePercent: Number(data.pricePercent),
      });
    } catch (error) {
      handleError(error);
    }
  }

  async deleteDetail(id: number) {
    try {
      await api.delete(`details/delete/${id}`);
    } catch (error) {
      handleError(error);
    }
  }

  async getDetailsByProductId(productId: number) {
    try {
      const res = await api.get(`details/${productId}`);
      return res.data;
    } catch (error) {
      handleError(error);
      return [];
    }
  }
}

export const detailsService = new DetailsService();
