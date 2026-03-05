import { shopLink } from "@/config/shopLinks";
import Link from "next/link";
import SearchForm from "../forms/searchForm";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full py-6 ">
      <div className="container flex justify-between items-center gap-10 max-md:gap-3">
        <Link href="/" className="uppercase font-bold text-[32px] integral max-md:order-2">
          Shop.co
        </Link>
        <nav className="p-0 m-0 max-md:order-1 max-md:fixed max-md:top-[200%] max-md:block max-md:w-full max-md:h-[calc(100%-96px)] shrink-0">
          <ul className="flex items-center gap-6 ">
            {shopLink.map((link) => (
              <li className="p-0 m-0" key={link.id}>
                <Link className="hover:text-neutral-400 duration-300 ease-in-out" href={link.path}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="order-3 max-w-144.25 w-full">
          <SearchForm />
        </div>
        <div className="flex items-center gap-3.5 order-4 shrink-0">
            <Link href="/cart"><Image src="/img/cart.svg" width={24} height={24} alt="Cart" /></Link>
            <Link href="/profile"><Image src="/img/avatar.svg" width={24} height={24} alt="Profile" /></Link>
        </div>
      </div>
    </header>
  );
}
