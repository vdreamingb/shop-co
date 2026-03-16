"use client";

import { productsService } from "@/services/products.service";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../home/ProductCard";
import ProductsView from "./ProductsView";
import { IProduct } from "@/shared/types/product.types";

export default function ProductsBrandView(): React.JSX.Element {
  const { data: brands = [] } = useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      return await productsService.getBrands();
    },
  });

  return (
    <div className="w-full">
      <ul className="flex flex-col">
        {brands.map((brand: { brand: string; products: IProduct[] }) => (
          <li key={brand.brand} className="mb-4 text-xl font-bold">
            {brand.brand === "" ? "No brand" : brand.brand}
            <hr className="opacity-60 bg-black" />
            <ProductsView data={brand.products} />
          </li>
        ))}
      </ul>
    </div>
  );
}
