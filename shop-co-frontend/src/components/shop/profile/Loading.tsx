export default function Loading() {
  return (
    <div className="flex items-center justify-center h-full py-32">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-[#1a1a1a] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs tracking-widest uppercase text-[#666]">
          Loading…
        </p>
      </div>
    </div>
  );
}
