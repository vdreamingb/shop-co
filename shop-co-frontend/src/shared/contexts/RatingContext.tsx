"use client"

import { createContext, ReactNode, useState } from "react"


export const RatingContext = createContext({
    rating: 0,
    setRating: (rating: number) => {}
})

export default function RatingProvider({children}: {children: ReactNode}){
    const [rating, setRating] = useState(0);
    return <RatingContext.Provider value={{rating, setRating}}>
        {children}
    </RatingContext.Provider>
}