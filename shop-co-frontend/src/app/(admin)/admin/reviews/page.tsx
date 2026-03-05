"use client";

import DataDisplay from "@/components/admin/DataDisplay";
import { reviewsTableHeadersConfig } from "@/config/reviewsTablesHeaders.config";
import { reviewsService } from "@/services/reviews.service";
import { useQuery } from "@tanstack/react-query";

export default function ReviewsPage(): React.JSX.Element {
  const query = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => await reviewsService.getAll(),
  });
  return (
    <>
      <h3 className="integral text-2xl">Reviews Dashboard</h3>
      <DataDisplay
        data={Array.isArray(query.data) ? query.data : []}
        headers={reviewsTableHeadersConfig}
        deleteFunc={reviewsService.deleteReview}
        queryName="reviews"
      />
    </>
  );
}
