import { useState } from "react"

export default function useModal(){
    const [ isOpen, setIsOpen ] = useState<boolean>(false)
    return {isOpen, setIsOpen}
}