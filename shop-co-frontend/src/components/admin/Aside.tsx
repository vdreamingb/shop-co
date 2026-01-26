import { ADMIN_URL_CONFIG } from "@/config/admin.url.config";
import Link from "next/link";

export default function AdminAside():React.JSX.Element{
    return <aside className="fixed  h-screen px-5 shadow-xl shadow-neutral-300 left-0 top-0 max-w-78 w-full overflow-auto bottom-0">
        <div>
            <Link href="/admin"><h2 className="integral font-bold text-[32px]">Shop.co</h2></Link>
        </div>
        <div className="mb-10">
            Admin panel of shop-co
        </div>
        <div className="py-7">
            <h4 className="integral text-neutral-900 mb-5">Working with db</h4>
            <ul className="">
                {ADMIN_URL_CONFIG.map((link) => <li key={link.id} className="cursor-pointer text-[16px] not-last:mb-2 ">
                    <Link className="inline-block hover:bg-black py-1 hover:px-4 rounded-lg hover:text-white duration-700 ease-in-out" href={link.path}>{link.name}</Link>
                    </li>)}
            </ul>
        </div>
        
    </aside>
}