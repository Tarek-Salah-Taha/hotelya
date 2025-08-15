export default function PriceDisplay({
  priceNew,
  priceOld,
  tFavorites,
}: {
  priceNew: number;
  priceOld: number;
  tFavorites: (key: string) => string;
}) {
  return (
    <>
      <div className="flex items-center mb-2 flex-row gap-1">
        <div className="flex items-end gap-2">
          <span className="text-xl font-bold text-primary">
            {priceNew} {tFavorites("$")}
          </span>
          <span className="text-sm text-gray-500 line-through">
            {priceOld} {tFavorites("$")}
          </span>
          <span className="text-sm text-primary">
            {tFavorites("per night")}
          </span>
        </div>
      </div>
      <div className="text-xs text-gray-500 mt-1">
        {tFavorites("Includes taxes and fees")}
      </div>
    </>
  );
}
