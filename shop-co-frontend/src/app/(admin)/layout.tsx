import AdminAside from "@/components/admin/Aside"
import AdminHeader from "@/components/admin/Header"
import AdminMain from "@/components/admin/Main"

export default function AdminLayout({children}: Readonly<{ children: React.ReactNode }>): React.JSX.Element {
    return <>
        
        <AdminAside />
        <AdminHeader />
        <AdminMain>{children}</AdminMain>
        
    </>
}