"use client";

import parseDate from "@/shared/utils/ParseDate";
import { useState } from "react";
import DeleteModal from "../deleteModal";
import useModal from "@/custom-hooks/useModal.hook";

interface Props {
  data: any[];
  headers: any[];
  deleteFunc: any;
  queryName: string;
}

export default function DataDisplay({
  data,
  headers,
  deleteFunc,
  queryName,
}: Props): React.JSX.Element {
  const [deleteId, setDeleteId] = useState<number>(0);

  const { isOpen, setIsOpen } = useModal();

  return (
    <>
      <table className="w-full mt-12 overflow-x-auto">
        <thead>
          <tr className="bg-neutral-700">
            {headers.map((header) => (
              <th
                key={header.header}
                className="text-left py-2 px-4 bg-gray-100"
              >
                {header.displayName}
              </th>
            ))}
            {queryName === "expediations" ||
            queryName === "expediationItems" ? (
              <></>
            ) : (
              <>
                <th className="text-left py-2 px-4 bg-gray-100">Delete</th>
                <th className="text-left py-2 px-4 bg-gray-100">Modify</th>
              </>
            )}
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              {headers.map((header) => (
                <td key={header.header} className="py-2 px-4">
                  {header.header === "createdAt" ||
                  header.header === "updatedAt" ||
                  header.header === "saleDate" ||
                  header.header === "expiryDate"
                    ? parseDate(item[header.header])
                    : item[header.header]}
                </td>
              ))}
              {queryName === "expediations" ||
              queryName === "expediationItems" ? (
                <></>
              ) : (
                <>
                  <td className="py-2 px-4">
                    <button
                      className="text-red-600 cursor-pointer"
                      onClick={() => {
                        setDeleteId(item.id);
                        setIsOpen(true)
                      }}
                    >
                      Delete
                    </button>
                  </td>
                  <td className="py-2 px-4">
                    <button className="text-orange-400 cursor-pointer">
                      Modify
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <DeleteModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        id={deleteId}
        deleteFunc={deleteFunc}
        queryName={queryName}
      />
    </>
  );
}
