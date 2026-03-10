import { IColor, IFiltersConfig } from "@/shared/types/filters.types";

export const FILTER_CONFIG: IFiltersConfig = {
  priceAbsoluteMin: 0,
  priceAbsoluteMax: 500,
  priceStep: 10,
};

export const COLORS: IColor[] = [
  { id: "green",  label: "Green",  bgClass: "bg-green-500",  checkClass: "text-white" },
  { id: "red",    label: "Red",    bgClass: "bg-red-500",    checkClass: "text-white" },
  { id: "yellow", label: "Yellow", bgClass: "bg-yellow-400", checkClass: "text-white" },
  { id: "orange", label: "Orange", bgClass: "bg-orange-500", checkClass: "text-white" },
  { id: "cyan",   label: "Cyan",   bgClass: "bg-cyan-400",   checkClass: "text-white" },
  { id: "blue",   label: "Blue",   bgClass: "bg-blue-600",   checkClass: "text-white" },
  { id: "purple", label: "Purple", bgClass: "bg-purple-500", checkClass: "text-white" },
  { id: "pink",   label: "Pink",   bgClass: "bg-pink-500",   checkClass: "text-white" },
  { id: "white",  label: "White",  bgClass: "bg-white border border-gray-200", checkClass: "text-black" },
  { id: "black",  label: "Black",  bgClass: "bg-black",      checkClass: "text-white" },
];

export const SIZES: string[] = [
  "XX-Small", "X-Small", "Small", "Medium",
  "Large", "X-Large", "XX-Large", "3X-Large", "4X-Large",
];

export const CATEGORIES: { label: string; href: string }[] = [
  { label: "T-shirts", href: "/shop/t-shirts" },
  { label: "Shorts",   href: "/shop/shorts" },
  { label: "Shirts",   href: "/shop/shirts" },
  { label: "Hoodie",   href: "/shop/hoodie" },
  { label: "Jeans",    href: "/shop/jeans" },
];

export const DRESS_STYLES: { label: string; href: string }[] = [
  { label: "Casual", href: "/shop/casual" },
  { label: "Formal", href: "/shop/formal" },
  { label: "Party",  href: "/shop/party" },
  { label: "Gym",    href: "/shop/gym" },
];

export const DEFAULT_SECTIONS_OPEN: Record<string, boolean> = {
  price:  true,
  colors: true,
  size:   true,
  style:  true,
};