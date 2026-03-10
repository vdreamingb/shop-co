"use client"

import { HistoryContext } from "@/shared/contexts/HistoryContext";
import Link from "next/link";
import { useContext } from "react";

interface HistoryItem {
  href: string;
  label: string;
}

interface HistoryContextType {
  history: HistoryItem[];
  setHistory: (history: HistoryItem[]) => void;
}

export default function History(): React.JSX.Element {
  const ctx = useContext(
    HistoryContext,
  ) as HistoryContextType;

  return (
    <div className="container py-6">
      <ul className="flex items-center">
        <li>
          <Link
            href="/"
            className="opacity-60 hover:opacity-100 transition-opacity duration-300 ease-in-out"
          >
            Home
          </Link>
        </li>
        {ctx.history.map((item: HistoryItem, index: number) => {
          const isLast: boolean = index === ctx.history.length - 1;
          return (
            <li key={index} className="flex items-center cursor-pointer">
              <span className="mx-2 opacity-60">{">"}</span>
              <Link
                href={item.href}
                className={`transition-opacity duration-300 ease-in-out capitalize ${
                  isLast
                    ? "opacity-100 pointer-events-none"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
