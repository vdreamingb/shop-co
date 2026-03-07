interface Props {
  label: string;
  value: string;
}

export function Field({ label, value }: Props) {
  return (
    <div className="border-b border-[#e8e4dc] py-4 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
      <span className="sm:w-44 text-xs tracking-widest uppercase text-[#888] shrink-0">
        {label}
      </span>
      <span className="text-[#1a1a1a] text-sm">{value || "—"}</span>
    </div>
  );
}
