"use client";

import { useFilters } from "@/custom-hooks/useFilters";
import { CATEGORIES, COLORS, DRESS_STYLES, SIZES } from "@/config/filterConstants";
import { Section }     from "./shop/Filter/Section";
import { NavLinkRow }  from "./shop/Filter/NavLinkRow";
import { PriceRange }  from "./shop/Filter/PriceRange";
import { ColorsWatch } from "./shop/Filter/ColorsWatch";
import { SizePill }    from "./shop/Filter/SizePill";

export default function ShopFilters(): React.JSX.Element {
  const {
    state,
    setPriceMin,
    setPriceMax,
    toggleColor,
    toggleSize,
    toggleSection,
    applyFilters,
  } = useFilters();

  const { priceMin, priceMax, selectedColors, selectedSizes, openSections } = state;

  return (
    <aside
      className="max-w-64 w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col"
      aria-label="Product filters"
    >

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900 tracking-tight">Filters</h2>
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
        </svg>
      </div>

      <nav className="flex flex-col border-b border-gray-100 pb-4 mb-4" aria-label="Product categories">
        {CATEGORIES.map((cat) => (
          <NavLinkRow key={cat.href} label={cat.label} href={cat.href} />
        ))}
      </nav>

      <Section title="Price" sectionKey="price" open={openSections.price} onToggle={toggleSection}>
        <PriceRange
          min={priceMin}
          max={priceMax}
          onMinChange={setPriceMin}
          onMaxChange={setPriceMax}
        />
      </Section>

      <Section title="Colors" sectionKey="colors" open={openSections.colors} onToggle={toggleSection}>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Color selection">
          {COLORS.map((color) => (
            <ColorsWatch
              key={color.id}
              color={color}
              selected={selectedColors.includes(color.id)}
              onToggle={toggleColor}
            />
          ))}
        </div>
      </Section>

      <Section title="Size" sectionKey="size" open={openSections.size} onToggle={toggleSection}>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Size selection">
          {SIZES.map((size) => (
            <SizePill
              key={size}
              size={size}
              selected={selectedSizes.includes(size)}
              onToggle={toggleSize}
            />
          ))}
        </div>
      </Section>

      <Section title="Dress Style" sectionKey="style" open={openSections.style} onToggle={toggleSection} bordered={false}>
        <nav aria-label="Dress style categories">
          {DRESS_STYLES.map((style) => (
            <NavLinkRow key={style.href} label={style.label} href={style.href} />
          ))}
        </nav>
      </Section>

      <button
        onClick={applyFilters}
        className="w-full bg-black text-white rounded-full py-3 text-sm font-semibold hover:bg-gray-800 active:scale-95 transition-all duration-150 mt-1"
      >
        Apply Filter
      </button>
    </aside>
  );
}