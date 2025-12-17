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
  const searchText = useRef<HTMLInputElement>(null);

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
      console.log("Gemini Movie Results:", movies);
      const gptMovies = movies.split(",");
      const promiseArray = gptMovies.map((movie: string) =>
        searchMovieTMDB(movie)
      );
      const tmdbResults = await Promise.all(promiseArray);
      console.log(tmdbResults);
      dispatch(
        addGptMovieresult({ movieNames: gptMovies, movieResults: tmdbResults })
      );
    } catch (error) {
      console.error("Gemini API Error:", error);
    }
  };

  return (
    <div className="flex justify-center px-4">
      <form
        className="
          w-full max-w-2xl
          flex items-center gap-3
          bg-black/60 backdrop-blur-xl
          border border-white/10
          p-3 md:p-4 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.6)]
        "
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="
            flex-1
            px-4 py-2.5 md:py-3
            rounded-xl
            bg-white/5 text-white
            placeholder-gray-400
            outline-none
            border border-transparent
            focus:border-red-500 focus:ring-2 focus:ring-red-500/70
            transition
          "
          placeholder={lang[langkey].gptSearchPlaceholder}
        />

        <button
          type="button"
          onClick={handleGptSearchClick}
          className="
            inline-flex items-center justify-center gap-2
            bg-gradient-to-r from-red-500 via-red-600 to-red-700
            px-5 md:px-6 py-2.5 md:py-3
            rounded-xl
            text-sm md:text-base font-semibold text-white
            shadow-lg shadow-red-500/40
            transition duration-200
            hover:from-red-400 hover:via-red-500 hover:to-red-600
            hover:-translate-y-0.5 hover:shadow-red-500/70
            active:scale-95
          "
        >
          <span className="hidden md:inline-block">🎬</span>
          <span>{lang[langkey].search}</span>
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
