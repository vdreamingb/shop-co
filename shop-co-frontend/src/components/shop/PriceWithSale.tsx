"use client";

import { salesService } from "@/services/sales.service";
import { useQuery } from "@tanstack/react-query";

export default function PriceWithSale({
  price,
  productId,
}: {
  price: number;
  productId: number;
}): React.JSX.Element {
  const { data: salePercent = 0 } = useQuery({
    queryKey: ["salePercent", productId],
    queryFn: () => salesService.getPriceWithSale(productId),
  });

  const discountedPrice =
    salePercent > 0 ? price - (price * salePercent) / 100 : price;

  return (
    <div className="flex items-center gap-2">
      <h4 className="text-2xl font-bold">${discountedPrice.toFixed(2)}</h4>

      {salePercent > 0 && (
        <>
          <div style={{textDecoration:"line-through"}} className="text-gray-400 text-xl">
            ${price.toFixed(2)}
          </div>

          <div className="bg-red-500 text-white rounded-xl font-bold py-1 px-3 text-sm">
            -{salePercent}%
          </div>
        </>
      )}
    </div>
  );
}
