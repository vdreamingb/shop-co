import api from "@/config/axios.config";
import { ICreateDetails, IDetails } from "@/shared/types/details.types";

class DetailsService {
  async getAll(): Promise<IDetails[] | []> {
    try {
      const res = await api.get("details/all");
      return res.data;
    } catch (error) {
      console.log("An error occured");
      return [];
    }
  }

  async createDetail(data: ICreateDetails) {}
}

export const detailsService = new DetailsService();
