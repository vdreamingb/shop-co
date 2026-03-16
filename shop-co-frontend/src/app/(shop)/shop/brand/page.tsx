"use client";

import ProductsBrandView from "@/components/shop/shop/BrandsView";
import TopPart from "@/components/shop/shop/TopPart";
import { HistoryContext } from "@/shared/contexts/HistoryContext";
import { useContext, useEffect } from "react";

export default function BrandsView() {
  const { setHistory } = useContext(HistoryContext);

  useEffect(() => {
    setHistory([
      { label: "Shop", href: "/shop" },
      { label: "Brands", href: "/shop/brands" },
    ]);
  }, [setHistory]);

  return (
    <div className="w-full">
      <TopPart title="Brands" />
      <ProductsBrandView />
    </div>
  );
}
