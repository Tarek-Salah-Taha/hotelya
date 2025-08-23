import { motion } from "framer-motion";

type FilterCheckboxListProps = {
  items: string[];
  selected: string[];
  onChange: (value: string, checked: boolean) => void;
  getLabel?: (item: string) => string;
};

export default function FilterCheckboxList({
  items,
  selected,
  onChange,
  getLabel = (i) => i,
}: FilterCheckboxListProps) {
  return (
    <>
      {items.map((item) => (
        <motion.label
          key={item}
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-3 cursor-pointer text-gray-700"
        >
          <input
            type="checkbox"
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            checked={selected.includes(item)}
            onChange={(e) => onChange(item, e.target.checked)}
          />
          <span>{getLabel(item)}</span>
        </motion.label>
      ))}
    </>
  );
}
