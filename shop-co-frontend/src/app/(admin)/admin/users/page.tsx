"use client"

import DataDisplay from "@/components/admin/DataDisplay"
import { USERTABLE_HEADERS } from "@/config/userTableHeaders"
import { userService } from "@/services/user.service"
import { IUser } from "@/shared/types/user.types"
import { useQuery } from "@tanstack/react-query"

export default function AdminUsersDashboardPage():React.JSX.Element{

    const query = useQuery<IUser[]>({
        queryKey: ["users"],
        queryFn: async () => {
            const result = await userService.getUsers();
            return Array.isArray(result) ? result : [result];
        }
    })

    return <div className="">
        <h3 className="text-2xl integral">Users Dashboard</h3>
        <DataDisplay data={query.data ?? []} headers={USERTABLE_HEADERS} queryName="users" deleteFunc={userService.deleteUser}  />
    </div>
}