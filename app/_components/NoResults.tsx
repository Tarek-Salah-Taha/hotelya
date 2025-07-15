import { FaSearch } from "react-icons/fa";

export default function NoResults({ message = "No hotels found." }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center text-gray-600">
      <FaSearch size={48} className="mb-4 text-gray-400" />
      <p className="text-xl font-semibold">{message}</p>
      <p className="text-sm mt-2">
        Try adjusting your filters or resetting them.
      </p>
    </div>
  );
}
