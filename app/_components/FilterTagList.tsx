import { motion } from "framer-motion";

type Props = {
  filters: Record<string, (string | number)[] | string | number>;
  labels: Record<string, string>;
  onRemove: (key: string, value?: string | number) => void;
};

export default function FilterTagList({ filters, labels, onRemove }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {Object.entries(filters)
        .filter(([, val]) => (Array.isArray(val) ? val.length > 0 : val))
        .map(([key, val]) => {
          const label = labels[key] || key;
          const values = Array.isArray(val) ? val : [val];

          return values.map((v) => (
            <motion.span
              key={`${key}-${v}`}
              className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full shadow-sm"
            >
              {label}: {v}
              <button
                onClick={() => onRemove(key, v)}
                className="ml-1.5 text-blue-600 hover:text-red-500 transition-colors"
                aria-label="Remove filter"
              >
                ×
              </button>
            </motion.span>
          ));
        })}
    </div>
  );
}
