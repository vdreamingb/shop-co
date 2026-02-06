"use client"

import CreateButton from "@/components/admin/create-buttons/createButton"
import DataDisplay from "@/components/admin/DataDisplay"
import CustomModal from "@/components/CustomModal"
import CreateSalesForm from "@/components/forms/admin/CreateSalesForm"
import { SalesTableHeaders } from "@/config/salesTableHeaders"
import useModal from "@/custom-hooks/useModal.hook"
import { salesService } from "@/services/sales.service"
import { useQuery } from "@tanstack/react-query"

export default function SalesPage(){

    const query = useQuery({queryKey: ['sales'], queryFn: async () => await salesService.getAll()})
    const {isOpen, setIsOpen} = useModal()
    return <>
        <h3 className="integral text-2xl">Sales Dashboard</h3>
        <CreateButton isActive={isOpen} setIsActive={setIsOpen} text="Sales" />
        <DataDisplay data={Array.isArray(query.data) ? query.data : []} headers={SalesTableHeaders}/>
        <CustomModal content={<CreateSalesForm />} isOpen={isOpen} setIsOpen={setIsOpen} title="Create new Sales" />
    </>
}