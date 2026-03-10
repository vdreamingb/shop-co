interface Props {
  open: boolean;
}

export function ChevronIcon({ open }: Props): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${open ? "" : "rotate-180"}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 15l7-7 7 7"
      />
    </svg>
  );
}
