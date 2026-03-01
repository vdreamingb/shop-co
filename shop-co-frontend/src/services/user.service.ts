import { IUser } from "@/shared/types/user.types";
import axios from "axios";
import api from "@/config/axios.config";

class UserService {
  async getUsers(): Promise<IUser | any[]> {
    try {
      const res = await axios.get("http://localhost:1110/api/users", {
        withCredentials: true,
      });
      const data = res.data;
      return data;
    } catch (error) {
      handleError(error)
      return [];
    }
  }

  async deleteUser(id: number) {
    try {
      await api.delete(`users/delete/${id}`);
    } catch (error) {
      handleError(error)
    }
  }
}

export const userService = new UserService();
