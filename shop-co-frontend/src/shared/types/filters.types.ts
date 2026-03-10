export interface IColor {
  id: string;
  label: string;
  bgClass: string;
  checkClass: string;
}

export interface IFilterState {
  priceMin: number;
  priceMax: number;
  selectedColors: string[];
  selectedSizes: string[];
  openSections: Record<string, boolean>;
}

export interface IFiltersConfig {
  priceAbsoluteMin: number;
  priceAbsoluteMax: number;
  priceStep: number;
}
