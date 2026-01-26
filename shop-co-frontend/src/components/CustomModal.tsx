import { Dispatch, SetStateAction } from "react";
import Modal from "react-modal";

interface CustomModalProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    content: React.JSX.Element;
    title: string;
}

export default function CustomModal({isOpen, setIsOpen, content, title}: CustomModalProps):React.JSX.Element{
    return <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        className="bg-white p-6 rounded-lg min-w-xs max-w-md w-full mx-auto mt-40 max-h-70 h-full overflow-y-auto outline-none"
        overlayClassName="fixed inset-0 bg-black/50 flex z-150">
            <div className="">
                <h4 className="integral">{title}</h4>
            </div>
            {content}
        </Modal>
}