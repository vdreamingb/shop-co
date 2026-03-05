import Link from "next/link";

interface Props {
  id: number
  imageUrl: string;
  name: string;
  rating: number;
  price: string;
}

export default function ProductCard({
  id,
  imageUrl,
  name,
  rating,
  price,
}: Props): React.JSX.Element {
  const ratingList = Array.from({ length: 5 });

  return (
    <Link href={`/product/${id}`}>
      <img src={imageUrl} alt={name} className="rounded-[20px]" />
      <h5 className="font-bold mb-2 mt-4 text-xl">{name}</h5>

      <ul className="flex gap-1 items-center mb-2">
        {ratingList.map((_, index) => (
          <li key={index}>
            <img
              src={
                index < rating ? "/img/full-star.png" : "/img/empty-star.png"
              }
              alt="star"
              className="w-4 h-4"
            />
          </li>
        ))}
        <li>{rating}/5</li>
      </ul>

      <h6 className="text-2xl font-bold">${price}</h6>
    </Link>
  );
}
