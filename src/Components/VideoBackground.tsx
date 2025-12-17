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
      <iframe
        className="
          absolute top-1/2 left-1/2
          w-screen h-screen
          -translate-x-1/2 -translate-y-1/2
          scale-[1.35]
        "
        src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerVideo.key}&modestbranding=1`}
        allow="autoplay; fullscreen"
        title="Trailer"
      />
    </div>
  );
};

export default VideoBackground;
