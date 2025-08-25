import { FaSort } from "react-icons/fa";

type Props = {
  value: string;
  onChange: (val: string) => void;
  options: { value: string; label: string }[];
  label: string;
};

export default function SortSelect({ value, onChange, options, label }: Props) {
  return (
    <div className="mb-4">
      <label
        htmlFor="sortBy"
        className="flex items-center gap-2 font-semibold mb-2 text-base p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
      >
        <FaSort className="text-primary" /> {label}:
      </label>
      <select
        id="sortBy"
        className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
