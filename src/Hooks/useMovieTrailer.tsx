import { useEffect } from "react";
import { API_OPTIONS } from "../Utils/constants";
import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../Utils/movieSlice";

/* 🔥 ADD TYPE HERE */
interface Video {
  id: string;
  key: string;
  name: string;
  type: string;
}

const useMovieTrailer = (movieId: number) => {
  const dispatch = useDispatch();

  const getMovieVideos = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" + movieId + "/videos?language=en-US",
      API_OPTIONS
    );

    const json = await data.json();
    console.log(json);

    /* 🔥 ADD TYPE HERE */
    const filterData = json.results.filter(
      (video: Video) => video.type === "Trailer"
    );

    const trailer = filterData.length ? filterData[0] : json.results[0];
    console.log(trailer);

    dispatch(addTrailerVideo(trailer));
  };

  useEffect(() => {
    getMovieVideos();
  }, []);
};

export default useMovieTrailer;
