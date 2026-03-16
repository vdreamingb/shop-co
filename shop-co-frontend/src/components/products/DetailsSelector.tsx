import { detailsService } from "@/services/details.service";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface Detail {
  color: string;
  size: string;
  stock: number;
}

interface Props {
  productId: number;
}

export default function DetailsSelector({
  productId,
}: Props): React.JSX.Element {
  const { data: details = [] } = useQuery({
    queryKey: ["details", productId],
    queryFn: async () => {
      return await detailsService.getDetailsByProductId(productId);
    },
  });

  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [maxQuantity, setMaxQuantity] = useState(1);

  if (details.length === 0)
    return <div className="my-6">There is nothing to select</div>;

  const canAddToCart = !!selectedColor && !!selectedSize;

  const handleAddToCart = () => {
    if (!canAddToCart) return;
    console.log({
      productId,
      color: selectedColor,
      size: selectedSize,
      quantity,
    });
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="py-6 border-b border-neutral-200">
        <h5 className="opacity-80 text-[16px] mb-2">Select Color</h5>
        <ul className="flex items-center gap-4">
          {details.map((detail: Detail) => (
            <li key={detail.color}>
              <button
                onClick={() => {
                  setMaxQuantity(detail.stock);
                  setSelectedSize(detail.size);
                  setSelectedColor(detail.color);
                }}
                aria-pressed={selectedColor === detail.color}
                aria-label={`Select color ${detail.color}`}
                className={`w-8 h-8 rounded-full transition-all focus:outline-none ${
                  selectedColor === detail.color
                    ? "ring-2 ring-offset-2 ring-neutral-800 scale-110"
                    : "hover:scale-105"
                }`}
                style={{ backgroundColor: detail.color }}
              >
                {selectedColor === detail.color && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4 drop-shadow"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="py-6 border-b border-neutral-200">
        <h5 className="opacity-80 text-[16px] mb-2">Select Size</h5>
        <ul className="flex items-center gap-4">
          {details.map((detail: Detail) => (
            <li key={detail.size}>
              <button
                onClick={() => {
                  setMaxQuantity(detail.stock);
                  setSelectedSize(detail.size);
                  setSelectedColor(detail.color);
                }}
                aria-pressed={selectedSize === detail.size}
                className={`px-3 h-8 rounded-full flex items-center justify-center border transition-all focus:outline-none ${
                  selectedSize === detail.size
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : "border-neutral-400 hover:border-neutral-700"
                }`}
              >
                {detail.size}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="py-6">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2 border border-neutral-300 rounded-full px-3 h-10">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
              className="w-6 h-6 flex items-center justify-center text-lg leading-none hover:opacity-60 transition-opacity disabled:opacity-30"
            >
              −
            </button>
            <span className="w-6 text-center text-sm font-medium select-none">
              {quantity}
            </span>
            <button
              onClick={() => {
                if (quantity < maxQuantity) {
                  setQuantity((q) => q + 1);
                }
              }}
              aria-label="Increase quantity"
              className="w-6 h-6 flex items-center justify-center text-lg leading-none hover:opacity-60 transition-opacity"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!canAddToCart}
            className={`flex-1 h-10 rounded-full text-sm font-medium transition-all focus:outline-none ${
              canAddToCart
                ? "bg-neutral-900 text-white hover:bg-neutral-700 active:scale-95"
                : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
            }`}
          >
            {canAddToCart ? "Add to Cart" : "Select color & size"}
          </button>
        </div>
      </div>
    </div>
  );
}
