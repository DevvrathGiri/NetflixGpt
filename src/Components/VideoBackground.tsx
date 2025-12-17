import { useSelector } from "react-redux";
import useMovieTrailer from "../Hooks/useMovieTrailer";
import type { RootState } from "../Utils/appStore";

const VideoBackground = ({ movieId }: { movieId: number }) => {
  const trailerVideo = useSelector(
    (store: RootState) => store.movies.trailerVideo
  );

  useMovieTrailer(movieId);

  if (!trailerVideo) return null;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Aspect-ratio container */}
      <div className="absolute inset-0">
        <iframe
          className="
            absolute
            top-1/2 left-1/2
            -translate-x-1/2 -translate-y-1/2

            w-[100vw]
            h-[120vh]        /* 🔥 KEY FIX for mobile */
            md:h-[100vh]

            scale-[1.2]
            md:scale-[1.35]

            pointer-events-none
          "
          src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerVideo.key}&modestbranding=1&rel=0`}
          allow="autoplay; fullscreen"
          title="Trailer"
        />
      </div>
    </div>
  );
};

export default VideoBackground;
