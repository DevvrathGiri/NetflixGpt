import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";
import type { RootState } from "../Utils/appStore";

const MainContainer = () => {
    const movies = useSelector((store:RootState)=>store.movies?.nowPlayingMovies);
    if(!movies) return null;

    const mainMovie = movies[0];
    console.log(mainMovie);

 const {original_title, overview,id} =mainMovie;
  return (
    <div>
   <VideoTitle title = {original_title} overview = {overview}/>
   <VideoBackground movieId={id}/>
    </div>
  )
}

export default MainContainer;
