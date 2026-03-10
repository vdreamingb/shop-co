interface Props{
    title: string;
}

export default function TopPart({ title }: Props):React.JSX.Element{
    return <div className="flex items-center justify-between w-full">
        <h1 className="text-[32px] font-semibold">{title}</h1>
        <p className="text-black opacity-60">Showing all the products from {title}</p>
    </div>
}