import api from "@/config/axios.config";
import { ICreateProduct, IProduct } from "@/shared/types/product.types";

class ProductsSercice {
  async getAllProducts(): Promise<IProduct[] | any[]> {
    try {
      const res = await api.get("products/all");
      return res.data;
    } catch (error) {
      alert("Error fetching products");
      return [];
    }
  }

  async createProduct(data: ICreateProduct) {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description ?? "");
      formData.append("price", data.price.toString());
      formData.append("brand", data.brand ?? "");
      formData.append("file", data.image[0]);
      console.log(data);
      await api.post("products/create", formData);
    } catch (error) {
      handleError(error);
    }
  }

  async deleteProduct(id: number) {
    try {
      await api.delete(`products/delete/${id}`);
    } catch (error) {
      handleError(error);
    }
  }
}

export const productsService = new ProductsSercice();
