import useNowPlayingMovies from "../Hooks/useNowPlayingMovies";
import usePopularMovies from "../Hooks/usePopularMovies";
import Header from "./Header";
import MainContainer from "./MainContainer";
import SeconadryContainer from "./SeconadryContainer";
import GptSearch from "./GptSearch"

const Browse = () => {
  useNowPlayingMovies();
  usePopularMovies();

  return (
    <>
      <Header />
      |<GptSearch/>
      <MainContainer />
      <SeconadryContainer />
    </>
  );
};

export default Browse;
