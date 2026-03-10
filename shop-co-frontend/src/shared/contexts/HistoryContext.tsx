"use client"

import { createContext, useState, ReactNode } from "react";
import { IHistoryItem } from "../types/history.types";

interface IHistoryContextType{
  history: IHistoryItem[];
  setHistory: React.Dispatch<React.SetStateAction<IHistoryItem[]>>;
};

export const HistoryContext = createContext<IHistoryContextType>({
  history: [],
  setHistory: () => {},
});

interface Props {
  children: ReactNode;
}

export function HistoryProvider({ children }: Props) {
  const [history, setHistory] = useState<IHistoryItem[]>([]);

  return (
    <HistoryContext.Provider value={{ history, setHistory }}>
      {children}
    </HistoryContext.Provider>
  );
}