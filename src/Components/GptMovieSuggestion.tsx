import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import type { RootState } from "../Utils/appStore";

const GptMovieSuggestion = () => {
  const { movieResults, movieNames } = useSelector((store: RootState) => store.gpt);
if (!movieNames || !movieResults) return null;


  return (
    <div className="px-6 py-10">
      {/* Heading */}
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-8 flex items-center gap-2">
        🎬 Recommended for You
      </h1>

      {/* Movie Rows */}
      <div className="space-y-12">
        {movieNames.map((movieName: string, index: number) => (
          <div
            key={movieName}
            className="
              bg-white/5
              backdrop-blur-lg
              border border-white/10
              rounded-2xl
              p-6
              shadow-2xl
              transition-all duration-300
              hover:bg-white/10
            "
          >
            <MovieList
              title={movieName}
              movies={movieResults[index]}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestion;
