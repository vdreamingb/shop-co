"use client";

import CreateButton from "@/components/admin/create-buttons/createButton";
import DataDisplay from "@/components/admin/DataDisplay";
import CustomModal from "@/components/CustomModal";
import CreateDetailsForm from "@/components/forms/admin/CreateDetailsForm";
import { DetailsTableHaders } from "@/config/detailsTableHeaders";
import useModal from "@/custom-hooks/useModal.hook";
import { detailsService } from "@/services/details.service";
import { IDetails } from "@/shared/types/details.types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function AdminDetailsPage() {
  const query = useQuery({
    queryKey: ["details"],
    queryFn: async () => await detailsService.getAll(),
  });

  const { isOpen, setIsOpen } = useModal();

  return (
    <div>
      <h3 className="integral text-2xl">Details Dashboard</h3>
      <CreateButton isActive={isOpen} setIsActive={setIsOpen} text="Details" />
      <DataDisplay
        data={Array.isArray(query.data) ? query.data : []}
        headers={DetailsTableHaders}
      />
      <CustomModal
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        title="Create new product details"
        content={<CreateDetailsForm setIsOpen={setIsOpen} />}
      />
    </div>
  );
}
