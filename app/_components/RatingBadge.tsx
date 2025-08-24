import { useTranslations } from "next-intl";
import getRatingLabel from "../_helpers/getRatingLabel";

type RatingBadgeProps = {
  rating: number;
  namespace: string;
};

function RatingBadge({ rating, namespace }: RatingBadgeProps) {
  const t = useTranslations(namespace);

  return (
    <div className="flex items-center bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-lg shadow-sm border border-white/20 overflow-hidden">
      <div className="bg-primary px-3 py-1.5 text-white font-bold">
        {rating}
      </div>
      <div className="px-3 py-1.5 text-sm font-medium text-gray-700">
        {getRatingLabel(rating, t)}
      </div>
    </div>
  );
}

export default RatingBadge;
