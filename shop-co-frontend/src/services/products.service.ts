import api from "@/config/axios.config";
import { ICreateProduct, IProduct } from "@/shared/types/product.types";
import { handleError } from "@/shared/utils/handleError";

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

  async newArrivals(products: IProduct[]) {
    return products
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, 8);
  }

  async getNewArrivals() {
    try {
      const res = await api.get("products/all");
      const arrivals = this.newArrivals(res.data);
      return arrivals;
    } catch (error) {
      handleError(error);
    }
  }

  async getTopSellings() {
    try {
      const res = await api.get("products/top-sellings");
      return res.data;
    } catch (error) {
      handleError(error);
    }
  }

  async getBrands():Promise<{brand: string, products: IProduct[]}[] | []> {
    try {
      const res = await api.get("products/all")
      const data = res.data as IProduct[];
      const brandsList = Array.from(new Set(data.map((product) => product.brand)));
      const brands = brandsList.map((brand) => {
        return {
          brand,
          products: data.filter((product) => product.brand === brand)
        }
      })
      return brands;
    } catch (error) {
      handleError(error);
      return []
    }
  }

  async getProductById(id: number): Promise<IProduct | null> {
    try {
      const res = await api.get(`products/${id}`);
      return res.data;
    } catch (error) {
      handleError(error);
      return null;
    }
  }
}

export const productsService = new ProductsSercice();
