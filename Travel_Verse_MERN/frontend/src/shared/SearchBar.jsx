import React, { useRef, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/config";
import { MagnifyingGlassIcon, MapPinIcon } from "@heroicons/react/24/outline";

const SearchBar = () => {
  const navigate = useNavigate();
  const locationRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const abortControllerRef = useRef(new AbortController());

  // Popular destinations for fallback
  const popularDestinations = [
    "France",
    "Japan",
    "Italy",
    "USA",
    "Indonesia","India",
    "Mexico","....",
  ];

  // Fetch search suggestions
  const fetchSuggestions = useCallback(async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    try {
      const signal = abortControllerRef.current.signal;
      const res = await fetch(`${BASE_URL}/tours/search/suggestions?query=${query}`, { signal });
      const data = await res.json();
      setSuggestions(data.suggestions.slice(0, 5)); // Limit to 5 suggestions
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Suggestions fetch error:", error);
      }
    }
  }, []);

  // Handle search
  const searchHandler = useCallback(async () => {
    const location = locationRef.current?.value.trim();

    if (!location) {
      setError("Please enter a destination");
      return;
    }

    setLoading(true);
    setError("");

    try {
      abortControllerRef.current.abort(); // Cancel previous request
      abortControllerRef.current = new AbortController();

      const res = await fetch(`${BASE_URL}/tours/search/getTourBySearch?city=${location}`, {
        signal: abortControllerRef.current.signal,
      });

      if (!res.ok) throw new Error("Failed to fetch results");

      const result = await res.json();

      if (result.data.length === 0) {
        setError(`No tours found for "${location}". Try these instead:`);
        setSuggestions(popularDestinations);
      } else {
        navigate(`/tours/search?city=${location}`, { state: result.data });
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        setError(error.message || "An error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // Handle keyboard events
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") searchHandler();
      if (e.key === "Escape") setSuggestions([]);
    },
    [searchHandler]
  );

  // Cleanup on unmount
  useEffect(() => () => abortControllerRef.current.abort(), []);

  return (
    <div className="max-w-3xl mx-auto mt-6 p-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg rounded-2xl border border-gray-200 dark:border-gray-700">
      <div className="relative">
        <div className="flex gap-3">
          {/* Location Input */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <MapPinIcon className="w-5 h-5 text-gray-500 dark:text-gray-300" />
            </div>
            <input
              ref={locationRef}
              type="text"
              placeholder="Where would you like your next adventure?"
              aria-label="Search destinations"
              className="w-full pl-10 pr-4 py-3 bg-gray-100/70 dark:bg-gray-700/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-orange-400 text-gray-700 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              onKeyDown={handleKeyDown}
              onChange={(e) => fetchSuggestions(e.target.value)}
            />
          </div>

          {/* Search Button */}
          <button
            disabled={loading}
            onClick={searchHandler}
            className="flex items-center justify-center bg-blue-500 dark:bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 dark:hover:bg-orange-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-orange-400"
          >
            <MagnifyingGlassIcon className="w-5 h-5 mr-2" />
            {loading ? "Searching..." : "Find Tours"}
          </button>
        </div>

        {/* Suggestions/Error Panel */}
        {(error || suggestions.length > 0) && (
          <div className="mt-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700">
            {error ? (
              <div className="text-red-500 dark:text-red-400">
                {error.includes("Try these instead") ? (
                  <>
                    <p className="mb-2">{error}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {popularDestinations.map((destination) => (
                        <button
                          key={destination}
                          onClick={() => {
                            locationRef.current.value = destination;
                            searchHandler();
                          }}
                          className="text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md text-gray-700 dark:text-gray-200"
                        >
                          {destination}
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  error
                )}
              </div>
            ) : (
              <div className="space-y-2">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => {
                      locationRef.current.value = suggestion;
                      searchHandler();
                    }}
                    className="w-full text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md text-gray-700 dark:text-gray-200"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(SearchBar);