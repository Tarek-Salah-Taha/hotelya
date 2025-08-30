import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

type Props = {
  filters: Record<string, (string | number)[] | string | number>;
  labels: Record<string, string>;
  onRemove: (key: string, value?: string | number) => void;
  count?: number;
};

export default function FilterTagList({
  filters,
  labels,
  onRemove,
  count,
}: Props) {
  const tFilters = useTranslations("FiltersPage");

  // Check if there are any active filters
  const hasActiveFilters = Object.entries(filters).some(([, val]) =>
    Array.isArray(val) ? val.length > 0 : val
  );

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {/* Only show result count if there are active filters */}
      {typeof count === "number" && hasActiveFilters && (
        <motion.div
          key="results-count"
          className="w-full flex justify-start"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <span className="inline-flex items-center bg-primary text-white text-sm font-semibold px-3 py-2 rounded-md shadow-sm">
            {tFilters("Showing")} {count} {tFilters("results")}
          </span>
        </motion.div>
      )}

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
