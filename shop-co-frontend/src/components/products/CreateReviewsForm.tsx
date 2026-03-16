import useAuthRefresh from "@/custom-hooks/auth.hook";
import { reviewsService } from "@/services/reviews.service";
import { ICreateReviews } from "@/shared/types/reviews.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";

interface Props {
  productId: number;
}

export default function CreateReviewsForm({
  productId,
}: Props): React.JSX.Element {
    useAuthRefresh();
  const { register, handleSubmit, watch } =
    useForm<Omit<ICreateReviews, "productId">>();

  const rating = watch("rating", 3);
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (data: Omit<ICreateReviews, "productId">) => {
      await reviewsService.createReview(data, productId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });

  const onsSubmit: SubmitHandler<Omit<ICreateReviews, "productId">> = (
    data,
  ) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onsSubmit)}>
      <input
        type="range"
        min="1"
        max="5"
        {...register("rating")}
        className="form-input mt-2 mb-2 accent-black"
      />
      <p className="">Rating: {rating}</p>
      <textarea
        placeholder="Write text of your review"
        {...register("comment")}
        className="form-input mt-5 mb-5 h-45"
      />

      <button type="submit" className="submit-form">
        Submit Review
      </button>
    </form>
  );
}
