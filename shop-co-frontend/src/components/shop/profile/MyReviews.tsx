
import React from "react";
import { IReview } from "@/shared/types/reviews.types";
import Image from "next/image";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { reviewsService } from "@/services/reviews.service";
import parseDate from "@/shared/utils/ParseDate";

interface MyReviewsProps {
  reviews: IReview[];
  onDelete: (id: number) => Promise<void>;
  deletingId: number | null;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-sm ${star <= rating ? "text-[#c8a84b]" : "text-[#ddd]"}`}
        >
          <Image src={"/img/full-star.png"} alt="Star" width={22.58} height={22.58} />
        </span>
      ))}
    </div>
  );
}

export default function MyReviews(): React.JSX.Element {
  const { data: reviews = [], isLoading: revLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: () => reviewsService.getAll(),
  });

  const queryClient = useQueryClient();

  const deleteReviewMutation = useMutation({
    mutationFn: (id: number) => reviewsService.deleteReview(id),
    onSuccess: (_, id) => {
      queryClient.setQueryData<typeof reviews>(["reviews"], (prev = []) =>
        prev.filter((r) => r.id !== id),
      );
    },
  });
  return (
    <div className="p-8 md:p-10">
      <div className="border-b-2 border-[#1a1a1a] pb-4 mb-8">
        <p className="text-xs tracking-[0.3em] uppercase text-[#888] mb-1">Feedback</p>
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-light text-[#1a1a1a] tracking-wide">My Reviews</h2>
          <span className="text-xs text-[#888] tracking-widest uppercase">
            {reviews.length} review{reviews.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <p className="text-[#888] text-sm tracking-widest uppercase">No reviews yet</p>
          <p className="text-[#aaa] text-xs max-w-xs text-center">
            Reviews you leave on products will appear here.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="border border-[#e0dbd0] hover:border-[#1a1a1a] transition-colors duration-200 p-5 bg-[#fdfcfa] group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <StarRating rating={review.rating} />
                    <span className="text-[10px] tracking-widest uppercase text-[#aaa]">
                      Product #{review.productId}
                    </span>
                  </div>
                  {review.comment && (
                    <p className="text-sm text-[#444] leading-relaxed mt-2 italic">
                      "{review.comment}"
                    </p>
                  )}
                  {review.createdAt && (
                    <p className="text-[10px] text-[#aaa] tracking-widest uppercase mt-3">
                      {parseDate(review.createdAt)}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => deleteReviewMutation.mutateAsync(review.id)}
                  disabled={deleteReviewMutation.isPending}
                  className={`
                    shrink-0 text-[10px] tracking-widest uppercase px-3 py-1.5 border cursor-pointer
                    transition-all duration-200
                    ${
                      deleteReviewMutation.variables === review.id
                        ? "border-[#ccc] text-[#ccc] cursor-not-allowed"
                        : "border-[#c0392b] text-[#c0392b] hover:bg-[#c0392b] hover:text-white opacity-0 group-hover:opacity-100"
                    }
                  `}
                >
                  {deleteReviewMutation.variables === review.id ? "Deleting…" : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
