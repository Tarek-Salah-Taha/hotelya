import { useTranslations } from "next-intl";
import { HotelAmenitiesProps } from "../_types/types";
import SectionTitle from "./SectionTitle";
import AmenityBadge from "./AmenityBadge";
import {
  availableAmenityCategories,
  amenityColorMap,
  amenityIconMap,
} from "../_config/amenities";

function HotelAmenities({ amenities }: HotelAmenitiesProps) {
  const t = useTranslations("HotelPage");

  const matchedAmenities = amenities
    .map(({ type, features }) => {
      const match = availableAmenityCategories.find((category) =>
        category.labels.includes(type)
      );
      if (match) {
        return {
          iconKey: match.icon,
          type,
          features,
        };
      }
      return null;
    })
    .filter(Boolean);

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group">
      <SectionTitle title={t("Amenities")} underline />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {matchedAmenities.map((amenity) => {
          const IconComponent =
            amenity &&
            amenityIconMap[amenity.iconKey as keyof typeof amenityIconMap];

          const colors =
            amenityColorMap[amenity?.iconKey as keyof typeof amenityColorMap] ||
            amenityColorMap.default;

          return (
            <div key={amenity?.type} className="space-y-3 group/amenity">
              <div className="flex items-center gap-3">
                <span className="transition-transform group-hover/amenity:rotate-12">
                  {IconComponent ? (
                    <IconComponent className={`text-lg ${colors.icon}`} />
                  ) : null}
                </span>
                <h3
                  className={`font-semibold ${colors.text} text-lg transition-colors duration-200 group-hover/amenity:text-primary`}
                >
                  {amenity?.type}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {amenity?.features.map((item, idx) => (
                  <AmenityBadge
                    key={idx}
                    label={item}
                    text={colors.text}
                    bg={colors.bg}
                    hover={colors.hover}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HotelAmenities;
