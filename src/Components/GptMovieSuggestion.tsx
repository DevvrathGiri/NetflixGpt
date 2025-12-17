import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import type { RootState } from "../Utils/appStore";

const GptMovieSuggestion = () => {
  const { movieResults, movieNames } = useSelector(
    (store: RootState) => store.gpt
  );
  if (!movieNames || !movieResults) return null;

  return (
    <div className="px-4 md:px-10 lg:px-16 py-10 space-y-8">
      {/* Section heading bar */}
      <div className="
        flex items-center justify-between
        rounded-2xl
        bg-gradient-to-r from-black/80 via-black/40 to-transparent
        px-5 md:px-8 py-4
        border border-white/10
        shadow-[0_18px_45px_rgba(0,0,0,0.85)]
      ">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/80 shadow-lg">
            🎬
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl md:text-3xl font-extrabold text-white">
              Recommended for You
            </h1>
            <span className="text-xs md:text-sm text-gray-300/80">
              Hand‑picked titles based on your search
            </span>
          </div>
        </div>

        <span className="hidden md:inline-block text-xs md:text-sm text-gray-300/80">
          Personalized by GPT
        </span>
      </div>

      {/* Movie rows */}
      <div className="space-y-10">
        {movieNames.map((movieName: string, index: number) => (
          <section
            key={movieName}
            className="
              relative overflow-hidden
              rounded-3xl
              bg-gradient-to-br from-white/8 via-white/4 to-transparent
              border border-white/12
              px-4 md:px-6 lg:px-8 py-5 md:py-6
              shadow-[0_22px_60px_rgba(0,0,0,0.9)]
              transition-all duration-300
              hover:border-white/25
              hover:shadow-[0_28px_80px_rgba(0,0,0,1)]
            "
          >
            {/* glowing top border accent */}
            <div className="
              pointer-events-none
              absolute inset-x-10 -top-[1px] h-[2px]
              bg-gradient-to-r from-red-500 via-pink-500 to-purple-500
              opacity-80
            " />

            {/* Row header */}
            <div className="mb-4 flex items-center justify-between relative z-10">
              <h2 className="text-lg md:text-2xl font-semibold text-white">
                {movieName}
              </h2>
              <span className="text-xs md:text-sm text-gray-300/90">
                {movieResults[index]?.length || 0} titles
              </span>
            </div>

            {/* Movie carousel/list */}
            <div className="relative z-10">
              <MovieList title={movieName} movies={movieResults[index]} />
            </div>

            {/* background blur highlight */}
            <div className="
              pointer-events-none
              absolute -right-24 bottom-0
              h-48 w-48
              rounded-full
              bg-red-500/40 blur-3xl
            " />
          </section>
        ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestion;
