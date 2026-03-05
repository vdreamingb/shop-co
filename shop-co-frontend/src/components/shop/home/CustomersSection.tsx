"use client";

import { customersData } from "@/shared/data/customers.data";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useRef, useEffect } from "react";
import CustomersReview from "./CustomersReview";
import Image from "next/image";

export default function CustomersSection(): React.JSX.Element {
  const [maxIndex, setMaxIndex] = useState(0);
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const visibleCards = 5;
  const totalCards = 7;
  const cardWidth = 420;


useEffect(() => {
  const calculateMaxIndex = () => {
    if (!ref.current) return;

    const width = ref.current.offsetWidth;

    if (width < 852) {
      setMaxIndex(totalCards - 1);
    } else if (width < 1240) {
      setMaxIndex(totalCards - 2);
    } else {
      setMaxIndex(totalCards - visibleCards);
    }
  };

  calculateMaxIndex();
  window.addEventListener("resize", calculateMaxIndex);

  return () => window.removeEventListener("resize", calculateMaxIndex);
}, []);

  const handleLeft = () => {
    setIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleRight = () => {
    setIndex((prev) => Math.min(prev + 1, maxIndex));
  };
  return (
    <section ref={ref} className="my-20">
      <div className="container mb-10 flex justify-between items-end max-md:flex-wrap">
        <h3 className="text-left font-bold integral text-[48px] max-md:text-[32px] ">
          Our Happy Customers
        </h3>
        <div className="shrink-0">
          <button
            className="p-3 rounded-full cursor-pointer hover:bg-neutral-100 duration-300 ease-in-out z-30"
            onClick={handleLeft}
          >
            <Image
              src="/img/left-arrow.svg"
              width={24}
              height={24}
              alt="Arrow left"
            />
          </button>
          <button
            className="p-3 rounded-full cursor-pointer hover:bg-neutral-100 duration-300 ease-in-out z-30"
            onClick={handleRight}
          >
            <Image
              src="/img/right-arrow.svg"
              width={24}
              height={24}
              alt="Arrow right"
            />
          </button>
        </div>
      </div>
      <div className="overflow-hidden mt-10">
        <motion.ul
          className="flex gap-5 px-4 justify-between"
          animate={{
            x: `-${index * cardWidth}px`,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 30 }}
        >
          {customersData.map((customer, i) => {
            const isFirstVisible = i === index;
            const isLastVisible = i === index + visibleCards - 1;
            const shouldBlur = isFirstVisible || isLastVisible;

            return (
              <motion.li
                key={customer.name}
                className={`
        w-100
        shrink-0
        transition-all duration-300 -translate-x-[65%] max-lg:translate-x-0 max-xl:translate-x-0
        ${shouldBlur ? "blur-sm max-lg:blur-none opacity-70 max-xl:opacity-100 max-xl:blur-none" : ""}
      `}
              >
                <CustomersReview
                  authorName={customer.name}
                  comment={customer.comment}
                />
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
