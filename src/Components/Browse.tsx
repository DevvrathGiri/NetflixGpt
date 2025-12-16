import useNowPlayingMovies from "../Hooks/useNowPlayingMovies";
import Header from "./Header";
import MainContainer from "./MainContainer";
import SeconadryContainer from "./SeconadryContainer";

const Browse = () => {
  useNowPlayingMovies();

  return (
    <>
      <Header />
      <MainContainer />
      <SeconadryContainer />
    </>
  );
};

export default Browse;
