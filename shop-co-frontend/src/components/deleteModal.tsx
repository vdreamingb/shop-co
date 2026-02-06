import Modal from "react-modal";

interface Props{
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DeleteModal({isOpen, setIsOpen}: Props):React.JSX.Element{
    return <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} className="bg-white p-6 rounded-lg min-w-xs max-w-md w-full mx-auto mt-40 max-h-70 h-full overflow-y-auto outline-none" overlayClassName="fixed inset-0 bg-black/50 flex z-150">
        <h5 className="text-xl">Are you sure?</h5>
        <button className="text-white bg-red-700 px-3 py-1">Delete</button>
    </Modal>
}