"use client";

import ProductCard from "./ProductCard";
import { productsService } from "@/services/products.service";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TopSellings() {
  const query = useQuery({
    queryKey: ["top-sellings"],
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
    <section className="pt-16 pb-20">
      <div className="container">
        <h3 className="title mb-13.75">Top Sellings</h3>
        <ul className="mb-9 flex items-start flex-wrap justify-center gap-5">
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
