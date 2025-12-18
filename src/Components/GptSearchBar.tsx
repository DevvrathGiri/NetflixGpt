import { useDispatch, useSelector } from "react-redux";
import { lang } from "../Utils/languageConstants";
import type { RootState } from "../Utils/appStore";
import { useRef } from "react";
import { callGemini } from "../Utils/geminiClient";
import { API_OPTIONS } from "../Utils/constants";
import { addGptMovieresult } from "../Utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langkey = useSelector((store: RootState) => store.config.lang);

  // ✅ textarea ke liye correct ref type
  const searchText = useRef<HTMLTextAreaElement>(null);

  // ✅ mobile check
  const isMobile = window.innerWidth < 768;

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
    <div className="flex justify-center px-4">
      <form
        className="
          w-full
          md:w-[75vw] lg:w-[70vw] xl:w-[65vw]
          max-w-none
          flex items-center gap-4
          bg-black/60 backdrop-blur-xl
          border border-white/10
          px-5 py-3
          rounded-2xl
          shadow-[0_10px_40px_rgba(0,0,0,0.6)]
        "
        onSubmit={(e) => e.preventDefault()}
      >
        <textarea
          ref={searchText}
          rows={1}
          className="
            flex-1
            resize-none
            overflow-hidden
            px-4 md:px-5
            py-2.5 md:py-3
            rounded-xl
            bg-white/5 text-white
            placeholder-gray-400
            text-base md:text-lg
            leading-snug
            outline-none
            border border-transparent
            focus:border-red-500
            focus:ring-2 focus:ring-red-500/60
          "
          placeholder={
            isMobile
              ? "Search movies"
              : "What would you like to watch today?"
          }
        />

        <button
          type="button"
          onClick={handleGptSearchClick}
          className="
            shrink-0
            px-4 md:px-7
            py-2.5 md:py-3
            rounded-xl
            bg-gradient-to-r from-red-500 via-red-600 to-red-700
            text-white font-semibold
            shadow-lg shadow-red-500/40
            hover:brightness-110
            active:scale-95
          "
        >
          🎬 Search
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
