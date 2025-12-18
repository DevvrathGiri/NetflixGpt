import useNowPlayingMovies from "../Hooks/useNowPlayingMovies";
import usePopularMovies from "../Hooks/usePopularMovies";
import Header from "./Header";
import MainContainer from "./MainContainer";
import SeconadryContainer from "./SeconadryContainer";
import GptSearch from "./GptSearch"
import { useSelector } from "react-redux";
import type { RootState } from "../Utils/appStore";
import useTopRatedMovies from "../Hooks/useTopRatedMovies";
import useUpcomingMovies from "../Hooks/useUpcomingMovies";

const Browse = () => {
  const showGptSearch = useSelector((store:RootState)=>store.gpt.showGptSearch);
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  return (
  <div>
      <Header />
      {showGptSearch ?(<GptSearch/>):(<><MainContainer />
      <SeconadryContainer /></>)}
  </div>
  );
};

export default Browse;
