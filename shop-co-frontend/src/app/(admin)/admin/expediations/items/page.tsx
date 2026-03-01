"use client";

import { expediationsService } from "@/services/expediations.service";
import DataDisplay from "@/components/admin/DataDisplay";
import { useQuery } from "@tanstack/react-query";
import { ExpediationsItemsTableHeaders } from "@/config/expediationsTableHeaders.config";

export default function ExpediationsItemsPage(): React.JSX.Element {
  const query = useQuery({
    queryKey: ["expediationItems"],
    queryFn: async () => await expediationsService.getAllExpediationsItems(),
  });

  return (
    <>
      <h3 className="integral text-2xl">Expediation Items DashBoard</h3>
      <DataDisplay
        data={Array.isArray(query.data) ? query.data : []}
        headers={ExpediationsItemsTableHeaders}
        deleteFunc={() => {}}
        queryName="expediationItems"
      />
    </>
  );
}
