import { useSelector } from "react-redux";
import useMovieTrailer from "../Hooks/useMovieTrailer";
import type { RootState } from "../Utils/appStore";

const VideoBackground = ({ movieId }: { movieId: number }) => {
  const trailerVideo = useSelector(
    (store: RootState) => store.movies.trailerVideo
  );

  // TMDB se trailer fetch
  useMovieTrailer(movieId);

  // jab tak trailer nahi aata, kuch mat dikhao
  if (!trailerVideo) return null;

  return (
 <div className="absolute inset-0 z-0 overflow-hidden">
  <iframe
    className="
      absolute
      -top-80 md:top-1/2
      left-1/2
      -translate-x-1/2
      md:-translate-y-1/2
      w-[140vw] sm:w-[130vw] md:w-[115vw]
      h-240
      scale-110 sm:scale-120 md:scale-[1.25]
      pointer-events-none
    "
    src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerVideo.key}&modestbranding=1&rel=0&playsinline=1`}
    allow="autoplay; fullscreen"
    title="Trailer"
  />
</div>

  );
};

export default VideoBackground;
