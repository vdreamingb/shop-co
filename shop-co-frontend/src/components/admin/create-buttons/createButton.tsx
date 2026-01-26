"use client"
import { MouseEventHandler, useState } from "react";

export default function CreateButton({onClick}: {onClick: MouseEventHandler}): React.JSX.Element {
    

    return <>
        <button onClick={onClick}  className="mt-8 cursor-pointer py-2 bg-black px-4 rounded-4xl text-white hover:rounded-none duration-500 ease-in-out">Create New User +</button>
    </>
}