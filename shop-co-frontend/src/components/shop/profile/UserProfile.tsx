"use client";

import { authService } from "@/services/auth.service";
import { useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import UserDashBoard from "./UserDashBoard";

export default function UserProfile(): React.JSX.Element {
  const query = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const data = await authService.whoamI();
      return data;
    },
  });

  const onClick = async () => {
    await authService.logout();
    redirect("/");
  };

  return (
    <section className="flex flex-col flex-1 pt-6">
      <div className="container flex flex-col pb-10 h-full relative min-h-120">

        <div className="flex justify-between items-center border-b-8 border-black pb-5">
          <div>
            <h3 className="integral text-4xl">
              {query.data?.firstName} {query.data?.lastName}
            </h3>
            <p>Email: {query.data?.email}</p>
          </div>

          <button
            onClick={onClick}
            className="bg-red-600 hover:bg-red-500 text-white duration-300 px-7 py-2 rounded-md"
          >
            Log out
          </button>
        </div>

        <div className="flex-1 flex flex-col">
          <UserDashBoard />
        </div>
      </div>
    </section>
  );
}
