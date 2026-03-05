import { logoList } from "@/shared/types/logo.list";

export default function LogoList():React.JSX.Element{
    return <section className="bg-black py-10.5">
        <ul className="container flex items-center gap-8.5 justify-center flex-wrap">
            {logoList.map((item) => <li key={item.id} className="">
                <img src={item.imageUrl} alt="Logo" />
            </li>)}
        </ul>
    </section>
}