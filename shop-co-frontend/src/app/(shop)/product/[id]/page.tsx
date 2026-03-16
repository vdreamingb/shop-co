"use client";

import CustomModal from "@/components/CustomModal";
import CreateReviewsForm from "@/components/products/CreateReviewsForm";
import ProductDetailedView from "@/components/products/ProductDetailedView";
import ReviewsView from "@/components/products/ReviewsView";
import useModal from "@/custom-hooks/useModal.hook";
import { RatingContext } from "@/shared/contexts/RatingContext";
import { useParams } from "next/navigation";
import { useContext } from "react";

export default function ProductPage() {
  const { rating, setRating } = useContext(RatingContext);
  const { id } = useParams();
  const { isOpen, setIsOpen } = useModal();
  return (
    <div className="">
      <ProductDetailedView id={Number(id)} />
      <div className="text-right container">
        <button onClick={() => setIsOpen(true)} className="bg-black text-white py-2 px-4 rounded-4xl">
          Write a Review
        </button>
      </div>
      <div className="">
        <ReviewsView id={Number(id)} />
      </div>
      <CustomModal isOpen={isOpen} setIsOpen={setIsOpen} content={<CreateReviewsForm productId={Number(id)} />} title="Write a Review" />
    </div>
  );
}
