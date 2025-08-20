import Link from "next/link";

type PageNavProps = {
  disabled: boolean;
  href: { pathname: string; query: Record<string, string | number> };
  onClick?: () => void;
  children: React.ReactNode;
};

export default function PageNav({
  disabled,
  href,
  onClick,
  children,
}: PageNavProps) {
  const classes = `px-3 py-1 rounded ${
    disabled
      ? "bg-gray-200 text-gray-500 pointer-events-none"
      : "bg-gray-100 hover:bg-gray-200"
  }`;

  if (onClick) {
    return (
      <button disabled={disabled} onClick={onClick} className={classes}>
        {children}
      </button>
    );
  }

  return (
    <Link
      href={href}
      aria-disabled={disabled}
      className={classes}
      tabIndex={disabled ? -1 : 0}
    >
      {children}
    </Link>
  );
}
