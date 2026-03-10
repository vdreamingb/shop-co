import { FILTER_CONFIG } from "@/config/filterConstants";

interface Props {
  min: number;
  max: number;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
}

const THUMB_CLASSES =
  "absolute w-full appearance-none bg-transparent cursor-pointer " +
  "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 " +
  "[&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full " +
  "[&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:border-2 " +
  "[&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md";

export function PriceRange({
  min,
  max,
  onMinChange,
  onMaxChange,
}: Props): React.JSX.Element {
  const { priceAbsoluteMin, priceAbsoluteMax } = FILTER_CONFIG;
  const range = priceAbsoluteMax - priceAbsoluteMin;

  const leftPct = ((min - priceAbsoluteMin) / range) * 100;
  const rightPct = 100 - ((max - priceAbsoluteMin) / range) * 100;

  return (
    <div className="flex flex-col gap-2">
      <div className="relative h-5 flex items-center">
        {/* Track background */}
        <div className="absolute w-full h-1 bg-gray-200 rounded-full" />

        {/* Active track */}
        <div
          className="absolute h-1 bg-black rounded-full"
          style={{ left: `${leftPct}%`, right: `${rightPct}%` }}
          aria-hidden="true"
        />

        {/* Min thumb */}
        <input
          type="range"
          min={priceAbsoluteMin}
          max={priceAbsoluteMax}
          value={min}
          onChange={(e) => onMinChange(Number(e.target.value))}
          className={THUMB_CLASSES}
          aria-label="Minimum price"
        />

        {/* Max thumb */}
        <input
          type="range"
          min={priceAbsoluteMin}
          max={priceAbsoluteMax}
          value={max}
          onChange={(e) => onMaxChange(Number(e.target.value))}
          className={THUMB_CLASSES}
          aria-label="Maximum price"
        />
      </div>

      <div className="flex justify-between text-xs text-gray-500">
        <span>${min}</span>
        <span>${max}</span>
      </div>
    </div>
  );
}
