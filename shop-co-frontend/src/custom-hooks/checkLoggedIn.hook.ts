"use client";
import { useEffect } from "react";
import { authService } from "@/services/auth.service";
import { useRouter } from "next/navigation";

let checkPromise: Promise<void> | null = null;

export default function useCheckLoggedIn() {
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    if (!checkPromise) {
      checkPromise = (async () => {
        try {
          const res = await authService.loggedIn();

          if (!isMounted) return;

          if (res?.message === "Logged in") {
            router.push("/profile");
          }
          else{
            const res = await authService.refresh();
            if (res === 200) {
              router.push("/profile");
            }else{
                
            }            
          }
        } catch (error) {
          console.error("Error checking login status:", error);
        } finally {
          checkPromise = null;
        }
      })();
    }

    return () => {
      isMounted = false;
    };
  }, [router]);
}