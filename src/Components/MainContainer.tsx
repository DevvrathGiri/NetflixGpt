import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";
import type { RootState } from "../Utils/appStore";

const MainContainer = () => {
  const movies = useSelector(
    (store: RootState) => store.movies.nowPlayingMovies
  );

  if (!movies || movies.length === 0) return null;

  const { id, original_title = "", overview = "" } = movies[0];

  return (
    <section className="
      relative w-full h-screen md:h-[100vh] overflow-hidden
      bg-gradient-to-b from-black via-neutral-500/5 to-black
    ">
      <VideoBackground movieId={id} />
      <VideoTitle title={original_title} overview={overview} />
    </section>
  );
};

export default MainContainer;
