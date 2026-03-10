import { IColor } from "@/shared/types/filters.types";

interface Props {
  color: IColor;
  selected: boolean;
  onToggle: (id: string) => void;
}

export function ColorsWatch({
  color,
  selected,
  onToggle,
}: Props): React.JSX.Element {
  return (
    <button
      onClick={() => onToggle(color.id)}
      className={`w-8 h-8 rounded-full ${color.bgClass} flex items-center justify-center transition-all ${
        selected ? "ring-2 ring-offset-2 ring-gray-800" : "hover:scale-110"
      }`}
      aria-label={`${color.label}${selected ? " (selected)" : ""}`}
      aria-pressed={selected}
    >
      {selected && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 h-4 ${color.checkClass}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M5 13l4 4L19 7"
          />
        </svg>
      )}
    </button>
  );
}
