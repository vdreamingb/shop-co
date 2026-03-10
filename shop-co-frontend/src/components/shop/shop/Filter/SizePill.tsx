interface Props {
  size: string;
  selected: boolean;
  onToggle: (size: string) => void;
}

export function SizePill({
  size,
  selected,
  onToggle,
}: Props): React.JSX.Element {
  return (
    <button
      onClick={() => onToggle(size)}
      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
        selected
          ? "bg-black text-white border-black"
          : "bg-gray-100 text-gray-700 border-gray-100 hover:border-gray-300"
      }`}
      aria-pressed={selected}
      aria-label={`Size ${size}`}
    >
      {size}
    </button>
  );
}
