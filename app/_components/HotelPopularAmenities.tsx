import { iconMap, availableTags } from "@/app/_constants/availableTags";

function HotelPopularAmenities({ tags }: { tags: string[] }) {
  const matchingTags = availableTags.filter((tag) => tags?.includes(tag.label));
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm text-text">
      <h2 className="text-2xl font-semibold mb-4">Popular Amenities</h2>

      <div className="flex flex-wrap gap-5 mt-2">
        {matchingTags.map((tag) => {
          const Icon = iconMap[tag.icon];
          return (
            <div
              key={tag.label}
              className="flex items-center gap-3 text-lg text-gray-700 bg-gray-100 px-2 py-1 rounded"
            >
              <Icon className="w-4 h-4 text-primary" size={30} />
              <span>{tag.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HotelPopularAmenities;
