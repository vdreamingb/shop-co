import { useMutation, useQueryClient } from "@tanstack/react-query";
import Modal from "react-modal";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
  deleteFunc: any;
  queryName: string;
}

export default function DeleteModal({
  isOpen,
  setIsOpen,
  id,
  deleteFunc,
  queryName,
}: Props): React.JSX.Element {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async () => {
      await deleteFunc(id);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [queryName] }),
  });

  const onClick = () => {
    mutate();
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      className="bg-white p-6 rounded-lg min-w-xs max-w-md w-full mx-auto mt-40 h-min overflow-y-auto outline-none"
      overlayClassName="fixed inset-0 bg-black/50 flex z-150"
    >
      <h5 className="text-xl mb-10 text-center">Are you sure?</h5>
      <div className="my-0 mx-auto w-full flex items-center justify-around">
        <button
          className="text-white bg-red-700 px-3 py-1 rounded-xl cursor-pointer hover:bg-red-600 duration-300 ease-in-out"
          onClick={onClick}
        >
          Delete
        </button>
        <button className="px-5 py-1 bg-neutral-800 text-white rounded-xl cursor-pointer hover:bg-neutral-700 ease-in-out ">
          No
        </button>
      </div>
    </Modal>
  );
}
