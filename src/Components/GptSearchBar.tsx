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
      const promiseArray = gptMovies.map((movie:string)=>searchMovieTMDB(movie))
      const tmdbResults = await Promise.all(promiseArray)
      console.log(tmdbResults);
      dispatch(addGptMovieresult({movieNames:gptMovies, movieResults:tmdbResults}))
    } catch (error) {
      console.error("Gemini API Error:", error);
    }
  };

  return (
    <div className="flex justify-center">
      <form
        className="
          w-full max-w-2xl
          flex items-center gap-3
          bg-black/70 backdrop-blur-md
          p-4 rounded-xl shadow-lg
        "
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="
            flex-1
            p-3 rounded-lg
            bg-gray-900 text-white
            placeholder-gray-400
            outline-none
            focus:ring-2 focus:ring-red-600
          "
          placeholder={lang[langkey].gptSearchPlaceholder}
        />

        <button
          type="button"
          onClick={handleGptSearchClick}
          className="
            bg-red-600 hover:bg-red-700
            text-white font-semibold
            px-6 py-3 rounded-lg
            transition
          "
        >
          {lang[langkey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
