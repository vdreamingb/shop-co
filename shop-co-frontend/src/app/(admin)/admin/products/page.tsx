"use client";

import { productsService } from "@/services/products.service";
import DataDisplay from "@/components/admin/DataDisplay";
import { productsTableHeaders } from "@/config/productsTableHeaders";
import { useQuery } from "@tanstack/react-query";
import CreateButton from "@/components/admin/create-buttons/createButton";
import CustomModal from "@/components/CustomModal";
import CreateProductForm from "@/components/forms/admin/CreateProductForm";
import useModal from "@/custom-hooks/useModal.hook";

export default function AdminProductsPage():React.JSX.Element{
    const query = useQuery({queryKey: ['products'], queryFn: async () => await productsService.getAllProducts()})
    const {isOpen, setIsOpen} = useModal()

    return <div className="">
        <h3 className="text-2xl integral">Products Dashboard</h3>
        <CreateButton text="Product" isActive={isOpen} setIsActive={setIsOpen} />
        <DataDisplay data={Array.isArray(query.data)? query.data : []} headers={productsTableHeaders} />
        <CustomModal title="Create a product" content={<CreateProductForm setIsOpen={setIsOpen} />} isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
}