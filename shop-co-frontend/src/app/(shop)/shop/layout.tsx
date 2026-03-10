import ShopAside from "@/components/shop/Aside";
import { HistoryProvider } from "@/shared/contexts/HistoryContext";
import History from "@/components/shop/shop/History";
import { Metadata } from "next";

const metadata: Metadata = {
  title: "Shop.co - Shop",
  description: "Discovers the best clothes for you and your style",
}

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <HistoryProvider>
      <div className="flex flex-col gap-6 py-6">
        <History />
        <main className="container relative flex gap-5 items-start">
          <ShopAside />
          {children}
        </main>
      </div>
    </HistoryProvider>
  );
}
