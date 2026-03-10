import { IProduct } from "@/shared/types/product.types";
import React from "react";
import ProductCard from "../home/ProductCard";

interface Props {
  data: IProduct[];
}

export default function ProductsView({ data }: Props): React.JSX.Element {
  return (
    <div className="w-full py-4 px-4">
      <ul className="flex flex-wrap gap-5 justify-center">
        {data.map((product) => (
          <li key={product.id}>
            <ProductCard
              id={product.id}
              name={product.name}
              price={String(product.price)}
              imageUrl={product.imageUrl}
              rating={Math.floor(Math.random() * (5 - 3 + 1)) + 3}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
