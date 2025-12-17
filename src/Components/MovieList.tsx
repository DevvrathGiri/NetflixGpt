import { useRef } from "react";
import MovieCard from "./MovieCard";

interface Movie {
  id: number;
  poster_path: string;
}

interface MovieListProps {
  title: string;
  movies: Movie[];
}

const MovieList = ({ title, movies }: MovieListProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!movies || movies.length === 0) return null;

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -700 : 700,
      behavior: "smooth",
    });
  };

  // 🔥 HARD BLOCK vertical scroll
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;

    e.preventDefault();        // stop default
    e.stopPropagation();       // stop bubbling
    scrollRef.current.scrollLeft += e.deltaY;
  };

  return (
    <div className="relative px-6 py-5">
      {/* TITLE */}
      <h2 className="text-white text-xl md:text-2xl font-semibold mb-4">
        {title}
      </h2>

      {/* LEFT ARROW */}
      <button
        onClick={() => scroll("left")}
        className="
          absolute left-2 top-1/2 -translate-y-1/2
          z-20 hidden group-hover:flex
          items-center justify-center
          w-12 h-12 text-3xl
          bg-black/70 text-white
          rounded-full hover:bg-black
        "
      >
        ‹
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={() => scroll("right")}
        className="
          absolute right-2 top-1/2 -translate-y-1/2
          z-20 hidden group-hover:flex
          items-center justify-center
          w-12 h-12 text-3xl
          bg-black/70 text-white
          rounded-full hover:bg-black
        "
      >
        ›
      </button>

      {/* 🔥 SCROLL ROW */}
      <div
        ref={scrollRef}
        onWheelCapture={handleWheel}
        className="
          flex gap-4
          overflow-x-auto
          overflow-y-hidden
          flex-nowrap
          scrollbar-hide
          scroll-smooth
          overscroll-x-contain   /* 🔥 IMPORTANT */
          overscroll-y-none      /* 🔥 IMPORTANT */
        "
      >
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            posterPath={movie.poster_path}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
