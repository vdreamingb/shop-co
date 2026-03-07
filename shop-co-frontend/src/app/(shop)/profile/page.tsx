"use client";

import { useEffect } from "react";
import UserProfile from "@/components/shop/profile/UserProfile";
import useAuthRefresh from "@/custom-hooks/auth.hook";
import { redirect } from "next/navigation";

export default function ProfilePage() {
  const ready = useAuthRefresh();

  useEffect(() => {
    if (ready === false) {
      redirect("/");
    }
  }, [ready]);

  if (ready === null || ready === undefined) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-black border-t-transparent"></div>
      </div>
    );
  }

  return <UserProfile />;
}