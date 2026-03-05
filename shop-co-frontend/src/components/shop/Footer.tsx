import { footerLists } from "@/shared/lists/footerLists";
import { socialMediaLinks } from "@/shared/lists/socialMediaLink";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#F0F0F0] w-full pt-35 pb-22 px-25 z-10 -mt-22.5">
      <div className="container">
        <div className="mb-12.5 flex items-start gap-[113.3px] max-md:flex-wrap justify-center">
          <div className=" max-w-62">
            <h3 className="integral text-[33.45px] font-bold mb-6.25">
              Shop.Co
            </h3>
            <p className="text-sm mb-8.75">
              We have clothes that suits your style and which you’re proud to
              wear. From women to men.
            </p>
            <ul className="flex items-center gap-3">
              {socialMediaLinks.map((link) => (
                <li key={link.id}>
                  <a href={link.url} className="" target="_blank">
                    <Image
                      src={link.iconPath}
                      width={28}
                      height={28}
                      alt="Icon"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full">
            <ul className="flex max-lg:gap-27.5 items-start flex-wrap justify-between max-lg:justify-center">
              {footerLists.map((item) => (
                <li key={item.listTitle}>
                  <h4 className="font-medium mb-6.25">{item.listTitle}</h4>
                  <ul className="">
                    {item.content.map((item) => (
                      <li
                        className="cursor-pointer hover:opacity-100 duration-300 ease-in-out text-black opacity-60 not-last:mb-4"
                        key={item.id}
                      >
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className=""></div>
      </div>
    </footer>
  );
}
