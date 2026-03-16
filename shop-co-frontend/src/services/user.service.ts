import { IUser } from "@/shared/types/user.types";
import axios from "axios";
import api from "@/config/axios.config";
import { handleError } from "@/shared/utils/handleError";

class UserService {
  async getUsers(): Promise<IUser | any[]> {
    try {
      const res = await axios.get(
        "https://shop-co-botr.onrender.com/api/users",
        {
          withCredentials: true,
        },
      );
      const data = res.data;
      return data;
    } catch (error) {
      handleError(error);
      return [];
    }
  }

  async deleteUser(id: number) {
    try {
      await api.delete(`users/delete/${id}`);
    } catch (error) {
      handleError(error);
    }
  }
  async getUserById(id: number): Promise<IUser | null> {
    try {
      const res = await api.get(`users/${id}`);
      console.log(res.data);
      return res.data;
    } catch (error) {
      handleError(error);
      return null;
    }
  }
}

export const userService = new UserService();
