"use client"

import { authService } from "@/services/auth.service";
import { use } from "react";
let adminPromise: Promise<void> | null = null;

export default async function checkAdmin(): Promise<any> {
    let isAdmin = false;

    const user = await authService.whoamI();
    if(user && user.role === 'ADMIN'){
        isAdmin = true;
    }

    return isAdmin;
}