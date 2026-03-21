"use client";
import { useEffect, useState } from "react";
import { authService } from "@/services/auth.service";
import { useRouter } from "next/navigation";

export default function useCheckLoggedIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        const res = await authService.loggedIn();

        if (!isMounted) return;

        if (res?.message === "Logged in" || res?.status === 401) {
          router.replace("/profile");
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [router]);

  return { loading };
}
