export default function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
        {label}
      </h3>
      <p className="text-gray-900">{value}</p>
    </div>
  );
}
