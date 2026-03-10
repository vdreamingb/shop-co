import Link from "next/link";

interface Props {
  label: string;
  href: string;
}

export function NavLinkRow({ label, href }: Props): React.JSX.Element {
  return (
    <Link
      href={href}
      className="flex items-center justify-between py-2 text-sm text-gray-700 hover:text-black transition-colors group"
    >
      <span>{label}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4 text-gray-400 group-hover:text-gray-700 transition-colors"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </Link>
  );
}
