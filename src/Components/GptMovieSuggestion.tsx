import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import type { RootState } from "../Utils/appStore";

const GptMovieSuggestion = () => {
  const { movieResults, movieNames } = useSelector(
    (store: RootState) => store.gpt
  );
  if (!movieNames || !movieResults) return null;

  return (
    <div className="px-4 md:px-8 lg:px-16 py-6 md:py-10 space-y-6 md:space-y-8">
      {/* Section heading */}
      <div
        className="
          flex items-center justify-between
          rounded-xl md:rounded-2xl
          bg-black/70
          px-4 md:px-6 lg:px-8 py-3.5 md:py-4
          border border-white/15
          shadow-[0_18px_50px_rgba(0,0,0,0.9)]
        "
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-600">
            🎬
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg md:text-2xl font-bold text-white">
              Recommended for you
            </h1>
            <span className="text-xs md:text-sm text-neutral-300">
              Based on your GPT search
            </span>
          </div>
        </div>

        <span className="hidden md:inline-block text-xs md:text-sm text-neutral-300">
          Powered by GPT
        </span>
      </div>

      {/* Movie rows */}
      <div className="space-y-7 md:space-y-8">
        {movieNames.map((movieName: string, index: number) => (
          <section
            key={movieName}
            className="
              rounded-xl md:rounded-2xl
              bg-black/65
              border border-white/12
              px-3.5 md:px-5 lg:px-6
              py-4 md:py-5
              shadow-[0_18px_55px_rgba(0,0,0,0.95)]
            "
          >
            {/* Row header */}
            <div className="mb-3 md:mb-4 flex items-center justify-between">
              <h2 className="text-base md:text-xl font-semibold text-white">
                {movieName}
              </h2>
              <span className="text-[11px] md:text-xs text-neutral-300">
                {movieResults[index]?.length || 0} titles
              </span>
            </div>

            {/* Movie carousel/list – same MovieList jo browse mein use kar rahe ho */}
            <MovieList title={movieName} movies={movieResults[index]} />
          </section>
        ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestion;
