import type { Metadata } from "next";
import { satoshi } from "@/fonts";
import "./globals.css";
import ModalProvider from "@/components/ModalProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Provider from "./provider";

export const metadata: Metadata = {
  title: "Shop.co",
  description: "The best online clothes website."
};

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider>
      <html lang="en">
      <body
        className={`${satoshi.className} antialiased`}
      >
        {children}
        <ModalProvider />
      </body>
      </html>
    </Provider>
  );
}
