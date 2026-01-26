import type { Metadata } from "next";
import { satoshi } from "@/fonts";
import "./globals.css";
import ModalProvider from "@/components/ModalProvider";

export const metadata: Metadata = {
  title: "Shop.co",
  description: "The best online clothes website."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${satoshi.className} antialiased`}
      >
        {children}
        <ModalProvider />
      </body>
    </html>
  );
}
