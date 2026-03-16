import Link from "next/link";
import ProductRating from "../ProductRating";
import PriceWithSale from "../PriceWithSale";

interface Props {
  id: number
  imageUrl: string;
  name: string;
  price: string;
}

export default function ProductCard({
  id,
  imageUrl,
  name,
  price,
}: Props): React.JSX.Element {
  return (
    <Link href={`/product/${id}`}>
      <img src={imageUrl} alt={name} className="rounded-[20px]" />
      <h5 className="font-bold mb-2 mt-4 text-xl">{name}</h5>

      <ProductRating id={id} />

      <PriceWithSale productId={id} price={Number(price)} />
    </Link>
  );
}
