"use client";

import { reviewsService } from "@/services/reviews.service";
import { useQuery } from "@tanstack/react-query";

export default function ProductRating({
  id,
}: {
  id: number;
}): React.JSX.Element {
  const ratingList = Array.from({ length: 5 });

  const { data: rating = 0 } = useQuery({
    queryKey: ["averageRating", id],
    queryFn: async () => {
      return await reviewsService.getAverageRating(id);
    },
  });

  return (
    <ul className="flex gap-1 items-center mb-2">
      {ratingList.map((_, index) => (
        <li key={index}>
          <img
            src={index < rating ? "/img/full-star.png" : "/img/empty-star.png"}
            alt="star"
            className="w-4 h-4"
          />
        </li>
      ))}
      <li>{rating}/5</li>
    </ul>
  );
}
