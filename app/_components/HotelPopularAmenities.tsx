import { iconMap, availableTags } from "../_constants/availableTags";

function HotelPopularAmenities({ tags }: { tags: string[] }) {
  return (
    <div
      className="
      bg-white p-6 rounded-xl 
      border border-gray-100
      shadow-sm hover:shadow-md 
      transition-all duration-300
      group
    "
    >
      <div className="relative pb-2 mb-4 overflow-hidden">
        <h2
          className="
          text-2xl font-semibold 
          text-gray-800
          inline-block
          group-hover:translate-x-1 
          transition-transform duration-300
        "
        >
          Popular Amenities
        </h2>
        <span
          className="
          absolute bottom-0 left-0 
          w-12 h-1 bg-primary rounded-full 
          scale-x-0 group-hover:scale-x-100 
          origin-left transition-transform duration-500
        "
        />
      </div>

      <div className="flex flex-wrap gap-3 mt-2">
        {tags.map((tagLabel) => {
          const matchedTag = availableTags.find((tag) =>
            tag.labels.includes(tagLabel)
          );
          const Icon = matchedTag ? iconMap[matchedTag.icon] : null;

          return (
            <div
              key={tagLabel}
              className="
                flex items-center gap-2 
                text-gray-700 
                bg-gray-50 hover:bg-gray-100
                px-3 py-2 rounded-lg
                border border-gray-200
                transition-all duration-200
                hover:scale-[1.02] hover:shadow-sm
                cursor-default
              "
            >
              {Icon && (
                <Icon
                  className="
                  w-4 h-4 text-primary 
                  transition-transform duration-300
                  group-hover:rotate-12
                "
                />
              )}
              <span className="text-sm font-medium">{tagLabel}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HotelPopularAmenities;
