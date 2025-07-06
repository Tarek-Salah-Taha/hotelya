"use client";

import { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { fetchDestinationSuggestions } from "../_lib/suggestionsApi";

function SearchBox() {
  const [destination, setDestination] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const [touched, setTouched] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const router = useRouter();

  const handleSearchClick = () => {
    setTouched(true);

    if (
      destination.trim().length < 2 ||
      typeof destination.trim() !== "string"
    ) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3000);
    } else {
      const cityOnly = destination.split(",")[0].trim();
      router.push(
        `/search-results?destination=${encodeURIComponent(cityOnly)}`
      );
    }
  };

  useEffect(() => {
    const loadSuggestions = async () => {
      const results = await fetchDestinationSuggestions(destination);
      setSuggestions(results);
    };

    loadSuggestions();
  }, [destination]);

  const handleSelectSuggestion = (suggestion: string) => {
    setDestination(suggestion);
    const cityOnly = suggestion.split(",")[0].trim();
    router.push(`/search-results?destination=${encodeURIComponent(cityOnly)}`);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 max-w-3xl w-full relative">
        {/* Destination Input */}
        <div className="flex flex-col w-full min-w-[240px] relative">
          <label className="text-sm font-medium mb-2">Destination</label>
          <div className="relative w-full">
            <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className={`border p-3 pl-10 rounded w-full text-base h-[52px] ${
                touched && destination.trim().length < 2 ? "border-red-500" : ""
              }`}
              placeholder="Where are you going?"
            />

            {/* Suggestions Dropdown */}
            {suggestions.length > 0 && (
              <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-md max-h-60 overflow-y-auto">
                {suggestions.map((sug, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelectSuggestion(sug)}
                    className="cursor-pointer px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <FaMapMarkerAlt className="text-primary" />
                    <span>{sug}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Search Button */}
        <div className="flex flex-col justify-end w-full min-w-[200px]">
          <button
            onClick={handleSearchClick}
            className="bg-primary text-white px-6 rounded w-full text-base font-semibold h-[52px] hover:bg-primary/90 shadow-lg transition"
          >
            Search Hotels
          </button>
          {showTooltip && destination.trim().length < 2 && (
            <div className="mt-2 text-sm text-red-600 bg-red-100 border border-red-300 p-2 rounded shadow-md z-10">
              Please enter a valid <strong>destination</strong> (at least 2
              letters).
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchBox;
