"use client";

import { useEffect, useState } from "react";
import { authService } from "@/services/auth.service";
import { useRouter } from "next/navigation";

export default function useAuth() {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await authService.loggedIn();

        if (res?.message === "Logged in") {
          setIsAuth(true);
        } else {
          setIsAuth(false);
          router.push("/");
        }
      } catch (error) {
        setIsAuth(false);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  return { loading, isAuth };
}