import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home - Shop-co",
  description: "Welcome to Shop-co! Discover our exclusive products and offers.",
};

export default function ShopHomePage():React.JSX.Element {
    return (
        <div className="">
            <Link href="/login">Go to Login Page</Link>
        </div>
    );
}