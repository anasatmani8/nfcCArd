"use client";

import { useState } from "react";

type StarRatingProps = {
  rating: number;
  onRate: (value: number) => void;
  label: string;
};

export default function StarRating({ rating, onRate, label }: StarRatingProps) {
  const [hovered, setHovered] = useState(0);

  return (
    <div
      className="flex flex-col items-center gap-3"
      role="radiogroup"
      aria-label={label}
    >
      <div className="flex gap-1.5">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = star <= (hovered || rating);
          return (
            <button
              key={star}
              type="button"
              role="radio"
              aria-checked={rating === star}
              aria-label={`${star} star${star > 1 ? "s" : ""}`}
              onClick={() => onRate(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              className="p-1 transition-transform duration-150 active:scale-90 hover:scale-110"
            >
              <svg
                viewBox="0 0 24 24"
                className={`h-11 w-11 sm:h-12 sm:w-12 transition-colors duration-150 ${
                  filled ? "fill-amber-400 text-amber-400" : "fill-transparent text-slate-300"
                }`}
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 2.5l2.94 6.36 6.98.68-5.24 4.73 1.55 6.88L12 17.77l-6.23 3.38 1.55-6.88L2.08 9.54l6.98-.68L12 2.5z"
                />
              </svg>
            </button>
          );
        })}
      </div>
    </div>
  );
}
