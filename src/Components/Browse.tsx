import useNowPlayingMovies from "../Hooks/useNowPlayingMovies";
import usePopularMovies from "../Hooks/usePopularMovies";
import Header from "./Header";
import MainContainer from "./MainContainer";
import SeconadryContainer from "./SeconadryContainer";

const Browse = () => {
  useNowPlayingMovies();
  usePopularMovies();

  return (
    <>
      <Header />
      <MainContainer />
      <SeconadryContainer />
    </>
  );
};

export default Browse;
