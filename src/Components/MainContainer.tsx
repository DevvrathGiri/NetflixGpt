import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";
import type { RootState } from "../Utils/appStore";
const MainContainer = () => {
  const movies = useSelector(
    (store: RootState) => store.movies.nowPlayingMovies
  );

  // ✅ THIS is the correct guard
  if (!movies || movies.length === 0) return null;

  const { id, original_title = "", overview = "" } = movies[0];

  return (
    <section className="relative w-screen h-screen">
      <VideoBackground movieId={id} />
      <VideoTitle title={original_title} overview={overview} />
    </section>
  );
};






export default MainContainer;
