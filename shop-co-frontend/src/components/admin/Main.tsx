export default function AdminMain({children}: Readonly<{ children: React.ReactNode }>): React.JSX.Element{
    return <main className="min-h-screen min-w-[calc(100vw-312px)] fixed right-0 top-19 px-9 pt-9 pb-9">
        <div className="drop-shadow-neutral-300 drop-shadow-xl h-full fixed max-w-[calc(100vw-380px)] w-full bg-white rounded-3xl overflow-y-auto pt-7 px-7 pb-40">
            {children}
        </div>
    </main>
}