import { Metadata } from "next"

const metadata: Metadata = {
    title: "Admin Panel"
}

export default function AdminPage():React.JSX.Element{
    return <div className="h-full w-full flex items-center justify-center">
        <h3 className="text-4xl integral">Hi , Admin 👋</h3>
    </div>
}