import Image from "next/image";

export default function NewsletterForm(){
    return <form className="max-w-87.25 w-full">
        <div className="bg-white max-w-87.25 h-11.5 flex items-center justify-between rounded-[62px] mb-3.5 px-4.5 gap-1 ">
            <Image alt="Email" src="/img/email.svg" width={24} height={24} />
            <input type="text" placeholder="Enter your email address" className="w-full focus:outline-none" />
        </div>
        <button type="submit" className="max-w-87.25 w-full rounded-[62px] flex items-center justify-center bg-white text-black h-11.5">Subscribe To Newsletter</button>
    </form>
}