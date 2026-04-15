"use client";

import { useState } from "react";

import { ListCard } from "./components/list-card";

type Restaurant = {
  id: string;
  name: string;
  rating: number;
  review_count: number;
  address: string;
  coordinates: { latitude: number; longitude: number };
  price: string | null;
  categories: string[];
  image_url: string;
  url: string;
};

export default function Home() {
  const [city, setCity] = useState("");
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState("");
  const [view, setView] = useState<"home" | "results">("home");

  const search = async () => {
    const q = city.trim();
    if (!q) return;
    setLoading(true);
    setError("");
    setRestaurants([]);

    try {
      const res = await fetch(`/api/restaurants?city=${encodeURIComponent(q)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setRestaurants(data.restaurants);
      setSearched(q);
      setView("results");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const goHome = () => {
    setView("home");
    setCity("");
    setRestaurants([]);
    setError("");
  };

  // --- RESULTS VIEW ---
  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <div className="relative h-56 md:h-80 lg:h-96 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80"
          alt="Food"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-white" />

        {/* Hero text */}
        <div className="absolute bottom-6 left-4 md:left-8 lg:left-12">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white drop-shadow-lg">
            Yelp
            <br />
            Restaurant Finder
          </h1>
        </div>
      </div>

      <div className="px-4 md:px-8 lg:px-12 pt-6 md:pt-8 max-w-5xl mx-auto">
        {/* Search bar */}
        <div className="flex gap-2 mb-6 md:mb-8">
          <div className="flex-1 flex items-center gap-2 bg-gray-200 rounded-xl px-3 py-2.5 md:px-4 md:py-3">
            <svg
              className="w-4 h-4 md:w-5 md:h-5 text-gray-400 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && search()}
              placeholder="Search restaurant by city..."
              className="flex-1 bg-transparent text-sm md:text-base text-black placeholder-gray-500 focus:outline-none"
            />
          </div>
          <button
            onClick={search}
            disabled={loading || !city.trim()}
            className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:bg-gray-300 flex items-center justify-center transition-colors flex-shrink-0"
          >
            {loading ? (
              <svg
                className="w-4 h-4 md:w-5 md:h-5 text-white animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            ) : (
              <svg
                className="w-4 h-4 md:w-5 md:h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            )}
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 md:p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm md:text-base max-w-2xl mx-auto">
            {error}
          </div>
        )}

        {searched && (
          <div>
            <p className="text-xs md:text-sm text-gray-500">
              <span className="text-black font-medium">
                {restaurants.length}
              </span>{" "}
              restaurants in{" "}
              <span className="text-rose-500 font-medium">{searched}</span>
            </p>
          </div>
        )}
      </div>

      {/* List */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 lg:px-12 pb-10  ">
        {loading && (
          <div className="space-y-4 pt-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex gap-3 py-3 border-b border-gray-200">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-gray-200 animate-pulse flex-shrink-0" />
                <div className="flex-1 space-y-2 pt-1">
                  <div className="h-3 md:h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                  <div className="h-2 md:h-3 bg-gray-200 rounded animate-pulse w-full" />
                  <div className="h-2 md:h-3 bg-gray-200 rounded animate-pulse w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 md:p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm md:text-base">
            {error}
          </div>
        )}

        {!loading && restaurants.length > 0 && (
          <div className="pt-4 gap-4 md:gap-6 lg:gap-12">
            {restaurants.map((r) => (
              <ListCard key={r.id} r={r} />
            ))}
          </div>
        )}

        {!loading && searched && restaurants.length === 0 && !error && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg md:text-xl font-semibold">
              No restaurants found
            </p>
            <p className="text-sm md:text-base mt-1">
              Try a different city name
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
