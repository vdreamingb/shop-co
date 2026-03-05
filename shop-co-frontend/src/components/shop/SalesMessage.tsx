"use client"

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

export default function SalesMessage() {
  const ref = useRef<HTMLDivElement>(null);

const onClick = () => {
  if (ref.current) {
    ref.current.classList.add("hidden");
  }
};
  return (
    <section ref={ref} className="w-full bg-black h-9.5 py-2.5 text-white gap-3">
      <div className="container justify-center flex relative gap-1.5">
        <div className="text-sm tracking-wide">
          Sign up and get 20% off to your first order.
        </div>
        <Link href="/signup" className="text-sm underline font-medium">
          Sign up now
        </Link>
        <button className="absolute right-0 block top-1 cursor-pointer" onClick={onClick}>
          <Image src="/img/close.svg" alt="Close" width={13.3} height={13.3} />
        </button>
      </div>
    </section>
  );
}
