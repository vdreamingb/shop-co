import SearchForm from "../forms/searchForm";

export default function AdminHeader():React.JSX.Element{
    return <header className="py-4 px-12 shadow-neutral-100 shadow-xl max-w-[calc(100vw-312px)] w-full fixed right-0 z-100 flex items-center justify-between">
        <SearchForm />
        <button className="text-red-600 font-medium cursor-pointer py-1 hover:px-3 hover:bg-red-600 hover:text-white rounded-xl duration-300 ease-in-out ">Log out</button>
    </header>
}   