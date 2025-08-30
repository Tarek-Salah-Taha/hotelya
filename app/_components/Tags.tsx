import { availableTags, iconMap } from "@/app/_constants/availableTags";

export default function Tags({ tags }: { tags?: string[] }) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-2">
      {tags.map((tagLabel) => {
        const matchedTag = availableTags.find((tagDef) =>
          tagDef.labels.includes(tagLabel)
        );
        const Icon = matchedTag ? iconMap[matchedTag.icon] : null;

        return (
          <div
            key={tagLabel}
            className="flex items-center gap-1 text-xs text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full"
          >
            {Icon && <Icon className="w-3 h-3 text-primary" />}
            <span>{tagLabel}</span>
          </div>
        );
      })}
    </div>
  );
}
