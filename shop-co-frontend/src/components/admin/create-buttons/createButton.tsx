"use client"
import { Dispatch, MouseEventHandler, SetStateAction, useState } from "react";

interface Props{
    isActive: boolean
    setIsActive: Dispatch<SetStateAction<boolean>>
    text: string
}

export default function CreateButton({isActive,setIsActive,text}: Props): React.JSX.Element {
    const onClick = () => {
        setIsActive(!isActive)
    }

    return <>
        <button onClick={onClick}  className="mt-8 cursor-pointer py-2 bg-black px-4 rounded-4xl text-white hover:rounded-none duration-500 ease-in-out">Create New {text} +</button>
    </>
}