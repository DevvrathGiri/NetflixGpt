import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../Utils/appStore";
import { useRef } from "react";
import { callGemini } from "../Utils/geminiClient";
import { API_OPTIONS } from "../Utils/constants";
import { addGptMovieresult } from "../Utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langkey = useSelector((store: RootState) => store.config.lang);

  const searchText = useRef<HTMLTextAreaElement>(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // 🔥 Language + device ke hisaab se placeholder
  const getPlaceholder = () => {
    if (langkey === "hindi") {
      return isMobile
        ? "Movie ya genre search karein"
        : "Aaj kya dekhna chahoge?";
    }
    if (langkey === "spanish") {
      return isMobile
        ? "Busca películas o géneros"
        : "¿Qué te gustaría ver hoy?";
    }
    // default English
    return isMobile
      ? "Search movies or genres"
      : "Search for a movie, series or genre";
  };

  const searchMovieTMDB = async (movie: string) => {
    const cleanedMovie = movie.trim();
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        encodeURIComponent(cleanedMovie) +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearchClick = async () => {
    if (!searchText.current) return;

    try {
      const query = searchText.current.value;
      const movies = await callGemini(query);
      const gptMovies = movies.split(",");

      const promiseArray = gptMovies.map((movie: string) =>
        searchMovieTMDB(movie)
      );
      const tmdbResults = await Promise.all(promiseArray);

      dispatch(
        addGptMovieresult({
          movieNames: gptMovies,
          movieResults: tmdbResults,
        })
      );
    } catch (error) {
      console.error("Gemini API Error:", error);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <form
        className="
          w-full max-w-2xl md:max-w-3xl lg:max-w-4xl
          flex items-center gap-3 md:gap-4
          bg-black/70 backdrop-blur-xl
          border border-white/15
          rounded-2xl md:rounded-3xl
          px-4 md:px-6 lg:px-8
          py-3.5 md:py-4.5
          shadow-[0_18px_60px_rgba(0,0,0,0.9)]
        "
        onSubmit={(e) => e.preventDefault()}
      >
        <textarea
          ref={searchText}
          rows={1}
          className="
            flex-1 resize-none overflow-hidden
            bg-transparent text-white placeholder-neutral-400
            text-sm md:text-base lg:text-lg
            px-1 md:px-2
            py-1.5 md:py-2
            outline-none
          "
          placeholder={getPlaceholder()}
        />

        <button
          type="button"
          onClick={handleGptSearchClick}
          className="
            shrink-0
            px-4 md:px-6 lg:px-7
            py-2.5 md:py-3
            rounded-xl
            bg-red-600 hover:bg-red-500
            text-white font-semibold
            text-sm md:text-base
            shadow-lg shadow-red-500/40
            transition-transform duration-150
            active:scale-95
          "
        >
          🔍 Search
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
