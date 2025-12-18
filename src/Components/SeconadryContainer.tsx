import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import type { RootState } from "../Utils/appStore";

const SeconadryContainer = () => {
  const movies = useSelector((store: RootState) => store.movies);

  return (
    <div
      className="
        relative z-30
        bg-gradient-to-b from-black via-neutral-900 to-black
        pt-0 md:pt-16 lg:pt-20
        pb-20 md:pb-28

        -mt-[340px] md:-mt-0   /* 👈 MOBILE OVERLAP */
        
      "
    >
      <div className="space-y-0">
        <MovieList title="📽️ Now Playing" movies={movies.nowPlayingMovies || []} />
        <MovieList title="🔥 Top Rated" movies={movies.topRatedMovies || []} />
        <MovieList title="⭐ Popular" movies={movies.popularMovies || []} />
        <MovieList title="👻 UpComing" movies={movies.upcomingMovies || []} />
        <MovieList title="⏰ Recent Releases" movies={movies.nowPlayingMovies || []} />
      </div>
    </div>
  );
};

export default SeconadryContainer;

