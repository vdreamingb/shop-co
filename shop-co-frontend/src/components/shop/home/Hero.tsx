import Link from "next/link";
import { statusData } from "@/shared/lists/statusList";

export default function HeroSection() {
  return (
    <section className="w-full bg-hero bg-cover bg-no-repeat bg-center min-h-158.25 pt-25.75 pb-29">
      <div className="container ">
        <div className="max-w-144.25 mb-12">
          <h1 className="integral font-bold text-[64px] text-black  leading-none max-lg:text-center max-md:text-[46px]">
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </h1>
          <p className="text-black opacity-60 my-8 max-lg:text-center">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <Link
            className="flex max-w-52.5 h-13 w-full items-center justify-center bg-black text-white rounded-[62px] hover:rounded-none duration-300 ease-in-out max-lg:mx-auto"
            href="/shop"
          >
            Shop now
          </Link>
        </div>
        <div className="flex flex-wrap items-center gap-8 md:gap-0 max-md:justify-center">
          {statusData.map((stat, index) => (
            <div
              key={stat.id}
              className={`flex flex-col px-8 ${
                index !== statusData.length - 1
                  ? "md:border-r border-black/10"
                  : ""
              }`}
            >
              <span className="text-4xl font-bold text-black">
                {stat.value}
              </span>
              <span className="text-sm text-gray-500 whitespace-nowrap">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
