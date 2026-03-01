import api from "@/config/axios.config";
import { ICreateDetails } from "@/shared/types/details.types";
import { ICreateSales, ISales } from "@/shared/types/sales.types";

class SalesService {
  async getAll(): Promise<ISales | []> {
    try {
      const res = await api.get("sales/all");
      const data = res.data;
      return data;
    } catch (error) {
      handleError(error);
      return [];
    }
  }

  async createSales(data: ICreateSales) {
    try {
      await api.post("sales/create", {
        productId: Number(data.productId),
        saleDate: data.salesStartDate,
        salesPercent: Number(data.salesPercent),
        expiryDate: data.expiryDate,
      });
    } catch (error) {
      handleError(error);
    }
  }

  async deleteSale(id: number) {
    try {
      await api.delete(`sales/delete/${id}`);
    } catch (error) {
      handleError(error);
    }
  }
}

export const salesService = new SalesService();
