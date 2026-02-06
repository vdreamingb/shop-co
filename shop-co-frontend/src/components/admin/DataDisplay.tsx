"use client"

import parseDate from "@/shared/utils/ParseDate";
import { useState } from "react";

interface Props{
    data: any[];
    headers:any[]
}

export default function DataDisplay({data, headers}: Props):React.JSX.Element{
    const [ deleteId, setDeleteId ] = useState<number | null>(null);

    return <table className="w-full mt-12 overflow-x-auto">
        <thead>
            <tr className="bg-neutral-700">

                {headers.map((header) => (
                    <th key={header.header} className="text-left py-2 px-4 bg-gray-100">{header.displayName}</th>
                ))}
                <th className="text-left py-2 px-4 bg-gray-100">
                    Delete
                </th>
                <th className="text-left py-2 px-4 bg-gray-100">
                    Modify
                </th>
            </tr>
        </thead>
        
        <tbody>
            {data.map((item) => (
                <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100">
                    {headers.map((header) => (
                        <td key={header.header} className="py-2 px-4">{header.header === "createdAt" || header.header === "updatedAt"?parseDate(item[header.header]): item[header.header]}</td>
                    ))}
                    <td className="py-2 px-4"><button className="text-red-600 cursor-pointer">Delete</button></td>
                    <td className="py-2 px-4"><button className="text-orange-400 cursor-pointer">Modify</button></td>
                </tr>
            ))}
        </tbody>
    </table>
}