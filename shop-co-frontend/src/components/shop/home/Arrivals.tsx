"use client";

import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import { productsService } from "@/services/products.service";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Arrivals(): React.JSX.Element {
  const query = useQuery({
    queryKey: ["arrivals"],
    queryFn: async () => await productsService.getNewArrivals(),
  });
  const [number, setNumber] = useState<number>(4);

  const onClick = () => {
    if (number === 4) {
      setNumber(8);
    } else if (number === 8) {
      setNumber(4);
    }
  };
  return (
    <section className="w-full pt-18 pb-16">
      <div className="container">
        <h2 className="title mb-13.75">New Arrivals</h2>
        <ul className="flex gap-5 mb-9 flex-wrap justify-center transition-all duration-500 ease-in-out">
          <AnimatePresence>
            {query.data?.slice(0, number).map((product) => (
              <motion.li
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={product.id}
              >
                <ProductCard
                  id={product.id}
                  imageUrl={product.imageUrl}
                  name={product.name}
                  price={String(product.price)}
                />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
        <button onClick={onClick} className="view-all">
          View All
        </button>
      </div>
    </section>
  );
}
