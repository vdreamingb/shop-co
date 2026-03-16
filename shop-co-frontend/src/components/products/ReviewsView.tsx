import { useQuery } from "@tanstack/react-query";
import CustomersReview from "../shop/home/CustomersReview";
import { reviewsService } from "@/services/reviews.service";
import { userService } from "@/services/user.service";

interface Props {
  id: number;
}

export default function ReviewsView({ id }: Props): React.JSX.Element {
  const { data: reviews } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      return await reviewsService.getReviewsByProductId(id);
    },
  });

  const {data: user = null} = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      return await userService.getUserById(id);
    },
  });

  console.log(id)
  if (!reviews || reviews.length === 0)
    return (
      <div className="my-6 container text-center integral">
        <h5 className=" mb-5">There are no reviews for this product yet</h5>
      </div>
    );

  return (
    <div className="my-6 container">
      <h2 className="text-2xl font-semibold mb-4 text-center">Reviews</h2>
      <ul className="">
        {reviews?.map((review: any) => (
          <li key={review.id} className="mb-4">
            <CustomersReview
              authorName={user ? `${user.firstName} ${user.lastName}` : "Anonymous"}
              comment={review.comment}
              createdAt={review.createdAt}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
