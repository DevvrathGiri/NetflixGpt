import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import type { RootState } from "../Utils/appStore";

const SeconadryContainer = () => {
    const movies = useSelector((store:RootState)=>store.movies);
  return (
    <div className="bg-black">
        <div className="-mt-30 relative z-20">
    <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies}/>
     <MovieList title={"Trending"} movies={movies.nowPlayingMovies}/>
      <MovieList title={"Popular"} movies={movies.popularMovies}/>
       <MovieList title={"Horror"} movies={movies.nowPlayingMovies}/>
        <MovieList title={"Recent"} movies={movies.nowPlayingMovies}/>
    </div>
    </div>
  )
}

export default SeconadryContainer;
