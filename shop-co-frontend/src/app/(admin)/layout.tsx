"use client";

import AdminAside from "@/components/admin/Aside";
import AdminHeader from "@/components/admin/Header";
import AdminMain from "@/components/admin/Main";
import useAuthRefresh from "@/custom-hooks/auth.hook";
import checkAdmin from "@/custom-hooks/admin.hook";
import { useEffect, useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userIsAdmin, setUserIsAdmin] = useState<boolean>(false);
  const ready = useAuthRefresh();

  useEffect(() => {
    let verifyAdmin = () => {};
    if(ready){
      verifyAdmin = async () => {
        const isAdmin = await checkAdmin();
        if(isAdmin){
          setUserIsAdmin(isAdmin);
        }
      }
    }
    verifyAdmin();
  },[ready])

  if (!ready) {
    return <div>Loading...</div>;
  }
  
  if(!userIsAdmin){
    return <div>Access Denied. You do not have permission to view this page.</div>;
  }

  

  if(userIsAdmin){
    return (
    <>
      <AdminAside />
      <AdminHeader />
      <AdminMain>{children}</AdminMain>
    </>
  )
  }
  
}