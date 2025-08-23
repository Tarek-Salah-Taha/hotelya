type FilterSelectProps = {
  value: string;
  items: string[];
  placeholder: string;
  onChange: (value: string) => void;
};

export default function FilterSelect({
  value,
  items,
  placeholder,
  onChange,
}: FilterSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
    >
      <option value="">{placeholder}</option>
      {items.map((item) => (
        <option key={item}>{item}</option>
      ))}
    </select>
  );
}
