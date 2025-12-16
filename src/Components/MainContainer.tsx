import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";
import type { RootState } from "../Utils/appStore";
const MainContainer = () => {
  const movies = useSelector(
    (store: RootState) => store.movies?.nowPlayingMovies
  );

  if (!movies) return null;

  const { original_title, overview, id } = movies[0];

  return (
    <section className="relative w-screen h-screen overflow-hidden">
      <VideoBackground movieId={id} />
      <VideoTitle title={original_title} overview={overview} />
    </section>
  );
};





export default MainContainer;
