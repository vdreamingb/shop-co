"use client"
import { useState, useEffect } from "react";
import { authService } from "@/services/auth.service";
import { useRouter } from "next/navigation";

let refreshPromise: Promise<void> | null = null;

export default function useAuthRefresh() {
    const [ready, setIsReady] = useState<boolean | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (!refreshPromise) {
            refreshPromise = (async () => {
                try {
                    const res = await authService.loggedIn();
                    
                    if (res?.message === "Logged in") {
                        setIsReady(true);
                    } 
                    else if (res?.message === "Expired") {
                        const refreshRes = await authService.refresh();
                        if (refreshRes === 200) {
                            setIsReady(true);
                        } else {
                            setIsReady(false);
                            router.push("/");
                        }
                    } else {
                        setIsReady(false);
                        router.push("/");
                    }
                } catch (error) {
                    console.error("Error during auth refresh:", error);
                    setIsReady(false);
                    router.push("/");
                } finally {
                    refreshPromise = null;
                }
            })();
        }
    }, [router]);

    return ready;
}