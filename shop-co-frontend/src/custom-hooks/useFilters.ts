import { useState, useCallback } from "react";
import { IFilterState } from "@/shared/types/filters.types";
import {
  DEFAULT_SECTIONS_OPEN,
  FILTER_CONFIG,
} from "@/config/filterConstants";

const DEFAULT_STATE: IFilterState = {
  priceMin: 50,
  priceMax: 200,
  selectedColors: ["blue"],
  selectedSizes: ["Large"],
  openSections: DEFAULT_SECTIONS_OPEN,
};

export function useFilters() {
  const [state, setState] = useState<IFilterState>(DEFAULT_STATE);

  const setPriceMin = useCallback((value: number) => {
    setState((prev) => ({
      ...prev,
      priceMin: Math.min(value, prev.priceMax - FILTER_CONFIG.priceStep),
    }));
  }, []);

  const setPriceMax = useCallback((value: number) => {
    setState((prev) => ({
      ...prev,
      priceMax: Math.max(value, prev.priceMin + FILTER_CONFIG.priceStep),
    }));
  }, []);

  const toggleColor = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      selectedColors: prev.selectedColors.includes(id)
        ? prev.selectedColors.filter((c) => c !== id)
        : [...prev.selectedColors, id],
    }));
  }, []);

  const toggleSize = useCallback((size: string) => {
    setState((prev) => ({
      ...prev,
      selectedSizes: prev.selectedSizes.includes(size)
        ? prev.selectedSizes.filter((s) => s !== size)
        : [...prev.selectedSizes, size],
    }));
  }, []);

  const toggleSection = useCallback((key: string) => {
    setState((prev) => ({
      ...prev,
      openSections: {
        ...prev.openSections,
        [key]: !prev.openSections[key],
      },
    }));
  }, []);

  const applyFilters = useCallback(() => {
    // Emit upward or call an API — extensible entry point
    console.log("Applied filters:", state);
  }, [state]);

  const resetFilters = useCallback(() => {
    setState(DEFAULT_STATE);
  }, []);

  return {
    state,
    setPriceMin,
    setPriceMax,
    toggleColor,
    toggleSize,
    toggleSection,
    applyFilters,
    resetFilters,
  };
}
