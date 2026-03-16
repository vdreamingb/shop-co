import { productsService } from "@/services/products.service";
import { useQuery } from "@tanstack/react-query";
import ProductRating from "../shop/ProductRating";
import PriceWithSale from "../shop/PriceWithSale";
import DetailsSelector from "./DetailsSelector";

interface Props {
  id: number;
}

export default function ProductDetailedView({ id }: Props): React.JSX.Element {
  const { data: product = null } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      return await productsService.getProductById(id);
    },
  });

  return (
    <div className="py-13">
      <div className="container">
        <div className="flex items-start gap-12">
          <img
            src={product?.imageUrl}
            alt={product?.name}
            className="w-full h-full object-cover max-w-111 max-h-132.5"
          />
          <div className="">
            <h1 className="text-[40px] font-bold integral mb-4">
              {product?.name}
            </h1>
            <ProductRating id={id} />
            <PriceWithSale
              productId={id}
              price={product ? Number(product.price) : 0}
            />
            <p className="text-[16px] opacity-80 py-6 border-b border-neutral-200">
              {product?.description}
            </p>
            <DetailsSelector productId={id} />
          </div>
        </div>
      </div>
    </div>
  );
}
