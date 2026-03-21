"use client";

import UserProfile from "@/components/shop/profile/UserProfile";
import useAuth from "@/custom-hooks/auth.hook";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const { loading, isAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuth) {
      // router.push("/login");
    }
  }, [loading, isAuth, router]);

  if (loading || !isAuth) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-black border-t-transparent"></div>
      </div>
    );
  }

  return <UserProfile />;
}
