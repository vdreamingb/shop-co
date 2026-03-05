import NewsletterForm from "../forms/NewsLetterForm";

export default function NewsletterSubscribe() {
  return (
    <div className="bg-transparent  z-40 relative max-lg:px-3 ">
      <div className="container">
        <div className="bg-black py-9 px-16 rounded-[20px] flex justify-between items-center z-40 max-md:flex-wrap max-md:justify-center gap-7">
          <div className="">
            <h4 className="integral uppercase text-[40px] text-white max-w-137.75 max-md:text-center">
              STAY UPTO DATE ABOUT OUR LATEST OFFERS
            </h4>
          </div>
          <NewsletterForm />
        </div>
      </div>
    </div>
  );
}
