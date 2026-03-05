"use client"
import { useState, useEffect } from "react";
import { authService } from "@/services/auth.service";
import { redirect } from "next/navigation";

let refreshPromise: Promise<void> | null = null;

export default function useAuthRefresh(){
    const [ready, setIsReady] = useState<boolean>(false);

    useEffect(() => {
        if(!refreshPromise){
            refreshPromise = (async () => {
                try {
                    const res = await authService.loggedIn();
                    if(res){
                        if(res.message === "Logged in"){
                            setIsReady(true);
                        }
                        else if(res.message === "Expired"){
                            const refreshRes = await authService.refresh();
                            if(refreshRes === 200){
                                setIsReady(true);
                            } else {
                                setIsReady(false);
                                redirect("/")
                            }
                        }  
                    } else {
                        setIsReady(false);
                    }
                } catch (error) {
                    console.error("Error during auth refresh:", error);
                    setIsReady(false);
                }
                finally{
                    refreshPromise = null;
                }
            })();
        }
    },[])

    return ready;
}