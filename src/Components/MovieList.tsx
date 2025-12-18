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
    const scrollAmount = window.innerWidth > 768 ? 600 : 300;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    e.preventDefault();
    scrollRef.current.scrollLeft += e.deltaY * 2;
  };

  return (
    <div className="
      relative px-4 sm:px-6 md:px-8 lg:px-12 py-6 md:py-8
      group bg-gradient-to-b from-neutral-900/50 to-transparent
      border-b border-neutral-800/30
    ">
      {/* Title */}
      <h2 className="
        text-xl sm:text-2xl md:text-3xl lg:text-3.5xl font-bold text-white
        mb-4 md:mb-6 pl-1 md:pl-2 pb-1
        bg-gradient-to-r from-white to-neutral-200 bg-clip-text 
        drop-shadow-lg
      ">
        {title}
      </h2>

      {/* Navigation Arrows */}
      <button
        onClick={() => scroll("left")}
        className="
          absolute -left-3 top-1/2 -translate-y-1/2 z-20 hidden lg:group-hover:flex
          w-12 h-12 bg-black/70 hover:bg-red-600/90 text-white text-2xl font-bold
          rounded-full shadow-2xl hover:shadow-red-500/50
          transition-all duration-200 hover:scale-110 active:scale-95
        "
        aria-label="Scroll Left"
      >
        ‹
      </button>

      <button
        onClick={() => scroll("right")}
        className="
          absolute -right-3 top-1/2 -translate-y-1/2 z-20 hidden lg:group-hover:flex
          w-12 h-12 bg-black/70 hover:bg-red-600/90 text-white text-2xl font-bold
          rounded-full shadow-2xl hover:shadow-red-500/50
          transition-all duration-200 hover:scale-110 active:scale-95
        "
        aria-label="Scroll Right"
      >
        ›
      </button>

      {/* Scrollable Movie Row */}
      <div
        ref={scrollRef}
        onWheel={handleWheel}
        className="
          flex gap-2.5 sm:gap-3 md:gap-4 lg:gap-5
          overflow-x-auto overflow-y-hidden scrollbar-hide
          snap-x snap-mandatory scroll-smooth
          pb-2 md:pb-4
          select-none
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
