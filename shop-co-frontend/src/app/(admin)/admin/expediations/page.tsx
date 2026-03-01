"use client";

import DataDisplay from "@/components/admin/DataDisplay";
import { ExpediationsTableHeaders } from "@/config/expediationsTableHeaders.config";
import { expediationsService } from "@/services/expediations.service";
import { useQuery } from "@tanstack/react-query";

export default function ExpediationsPage(): React.JSX.Element {
  const query = useQuery({
    queryKey: ["expediations"],
    queryFn: async () => await expediationsService.getAll(),
  });

  return (
    <>
      <h3 className="integral text-2xl">Expediations Dashboard</h3>
      <DataDisplay
        data={Array.isArray(query.data) ? query.data : []}
        headers={ExpediationsTableHeaders}
        queryName="expediations"
        deleteFunc={() => {}}
      />
    </>
  );
}
