import { Stars } from "./stars";

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

export function ListCard({ r }: { r: Restaurant }) {
  return (
    <div className="flex items-start gap-3 md:gap-4 py-3 md:py-4 border-b border-gray-200 last:border-0 relative ">
      <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden bg-gray-200 relative">
        {r.image_url ? (
          <img
            src={r.image_url}
            alt={r.name}
            className="w-full h-full object-cover absolute"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg
              className="w-7 h-7 md:w-8 md:h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-0.5 md:mb-1">
          <p className="text-black text-sm md:text-base font-semibold truncate">
            {r.name}
          </p>
          {/* Heart */}
          <button className="flex-shrink-0">
            <svg
              className="w-4 h-4 md:w-5 md:h-5 text-rose-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <p className="text-gray-500 text-xs md:text-sm mb-1 line-clamp-2">
          {r.address} · {r.categories.join(", ")}
        </p>

        <Stars rating={r.rating} />

        <div className="flex items-center justify-between mt-2.5 md:mt-3">
          <div>
            <span className="text-black text-sm md:text-base font-bold">
              {r.rating.toFixed(1)}
            </span>
            <span className="text-gray-500 text-xs md:text-sm ml-1">
              ({r.review_count.toLocaleString()})
            </span>
          </div>
          <a
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 md:px-4 md:py-2 rounded-md bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold transition-colors"
          >
            View
          </a>
        </div>

        {/* Coordinates */}
        <p className="text-gray-600 text-xs font-mono mt-4">
          {r.coordinates.latitude.toFixed(4)},{" "}
          {r.coordinates.longitude.toFixed(4)}
        </p>
      </div>
    </div>
  );
}
