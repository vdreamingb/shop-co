import Link from "next/link";

interface IStyleCard {
  label: string;
  image: string;
  customClass: string;
}

const StyleCard = ({ label, image, customClass }: IStyleCard) => (
  <Link href={`/shop/${label.toLowerCase()}`}
    className={`relative overflow-hidden rounded-2xl bg-[#F8F8F8] shadow-sm max-lg:h-[248.6] max-md: h-52 ${customClass}`}
  >
    <div className="absolute top-6 left-6 z-10">
      <h3 className="text-3xl font-bold text-gray-900">{label}</h3>
    </div>

    <div className="h-full w-full items-end justify-end">
      <img
        src={image}
        alt={label}
        className="object-cover object-bottom transition-transform duration-300 hover:scale-105 ml-0 w-full h-full"
      />
    </div>
  </Link>
);

export default function BrowseByDressStyle() {
  return (
    <section>
      <div className="container">
        <div className="bg-[#F0F0F0] rounded-[40px] pt-17.5 pb-19 relative px-16 max-md:px-10">
          <div className="title mb-16">Browse By Dress Style</div>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
            <StyleCard
              label="Casual"
              image="/img/casual.jpg"
              customClass="lg:col-span-5"
            />
            <StyleCard
              label="Formal"
              image="/img/formal.jpg"
              customClass="lg:col-span-7"
            />
            <StyleCard
              label="Party"
              image="/img/party.jpg"
              customClass="lg:col-span-7"
            />
            <StyleCard
              label="Gym"
              image="/img/gym.jpg"
              customClass="lg:col-span-5"
            />
          </ul>
        </div>
      </div>
    </section>
  );
}
