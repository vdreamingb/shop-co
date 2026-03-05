import Footer from "@/components/shop/Footer";
import Header from "@/components/shop/Header";
import NewsletterSubscribe from "@/components/shop/NewsletterSubscribe";
import SalesMessage from "@/components/shop/SalesMessage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop.co - Home",
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SalesMessage />
      <Header />
      <main className="">{children}</main>
      <NewsletterSubscribe />
      <Footer />
    </>
  );
}
