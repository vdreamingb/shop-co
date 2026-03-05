import Arrivals from "@/components/shop/home/Arrivals";
import BrowseByDressStyle from "@/components/shop/home/BrowseByDressStyle";
import CustomersSection from "@/components/shop/home/CustomersSection";
import HeroSection from "@/components/shop/home/Hero";
import LogoList from "@/components/shop/home/LogoList";
import TopSellings from "@/components/shop/home/TopSellings";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <LogoList />
      <Arrivals />
      <section>
        <div className="container">
          <hr className="bg-black opacity-10" />
        </div>
      </section>
      <TopSellings />
      <BrowseByDressStyle />
      <CustomersSection />
    </>
  );
}
