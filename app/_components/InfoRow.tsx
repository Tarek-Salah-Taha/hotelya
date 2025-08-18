type InfoRowProps = {
  icon: React.ElementType;
  children: React.ReactNode;
  href?: string;
  highlight?: "green" | "red";
};

function InfoRow({ icon: Icon, children, href, highlight }: InfoRowProps) {
  const highlightClass =
    highlight === "green"
      ? "text-green-600 font-medium"
      : highlight === "red"
      ? "text-red-600 font-medium"
      : "text-gray-700";

  const content = href ? (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className={`${highlightClass} hover:text-primary transition-colors duration-200 underline-offset-4 hover:underline break-all`}
    >
      {children}
    </a>
  ) : (
    <span className={`leading-relaxed ${highlightClass}`}>{children}</span>
  );

  return (
    <div className="flex items-start gap-3 group/item">
      <Icon className="w-6 h-6 shrink-0 text-primary mt-0.5 transition-transform group-hover/item:scale-110" />
      {content}
    </div>
  );
}

export default InfoRow;
