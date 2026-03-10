import { ReactNode } from "react";
import { ChevronIcon } from "./ChevronIcon";

interface Props {
  title: string;
  sectionKey: string;
  open: boolean;
  onToggle: (key: string) => void;
  children: ReactNode;
  bordered?: boolean;
}

export function Section({
  title,
  sectionKey,
  open,
  onToggle,
  children,
  bordered = true,
}: Props): React.JSX.Element {
  return (
    <div
      className={bordered ? "border-b border-gray-100 pb-4 mb-4" : "pb-4 mb-4"}
    >
      <button
        onClick={() => onToggle(sectionKey)}
        className="flex items-center justify-between w-full mb-3"
        aria-expanded={open}
        aria-controls={`section-${sectionKey}`}
      >
        <span className="text-base font-bold text-gray-900">{title}</span>
        <ChevronIcon open={open} />
      </button>

      {open && <div id={`section-${sectionKey}`}>{children}</div>}
    </div>
  );
}
