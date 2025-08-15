export default function PaginationControls({
  page,
  totalPages,
  onPrev,
  onNext,
  t,
}: {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  t: (key: string) => string;
}) {
  return (
    <div className="flex justify-center gap-4 mt-6">
      <button
        onClick={onPrev}
        disabled={page === 1}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      >
        {t("Prev")}
      </button>
      <span className="px-4 py-2">
        {t("Page")} {page} / {totalPages}
      </span>
      <button
        onClick={onNext}
        disabled={page === totalPages}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      >
        {t("Next")}
      </button>
    </div>
  );
}
