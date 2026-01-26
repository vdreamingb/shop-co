

interface Props{
    data: any[];
    headers:string[]
}

export default function DataDisplay({data, headers}: Props):React.JSX.Element{
    return <table className="w-full mt-12 ">
        <thead>
            <tr className="bg-neutral-700">

                {headers.map((header) => (
                    <th key={header} className="text-left py-2 px-4 bg-gray-100">{header.toUpperCase()}</th>
                ))}
        </tr>
        </thead>
        
        <tbody>
                {data.map((item) => (
            <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100">
                {headers.map((header) => (
                    <td key={header} className="py-2 px-4">{item[header]}</td>
                ))}
            </tr>
        ))}
        </tbody>
        
    </table>
}