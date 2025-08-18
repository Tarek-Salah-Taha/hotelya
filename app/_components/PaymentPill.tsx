export default function PaymentPill({
  icon: Icon,
  colorClass,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  colorClass: string;
  label: string;
}) {
  return (
    <div
      className={`flex items-center gap-2 ${colorClass} px-4 py-2 rounded-lg border border-transparent hover:border-current transition-all duration-200 cursor-default group/item rtl:flex-row-reverse`}
    >
      <span className="transition-transform group-hover/item:scale-110">
        <Icon className="text-lg" />
      </span>
      <span className="text-sm font-medium transition-transform group-hover/item:translate-x-0.5 rtl:group-hover/item:-translate-x-0.5">
        {label}
      </span>
    </div>
  );
}
