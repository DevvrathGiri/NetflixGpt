import {addUpcomingMovies } from "../Utils/movieSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { API_OPTIONS } from "../Utils/constants"
const useUpcomingMovies = () =>{
      const Dispatch = useDispatch();
  const getUpcomingMovies = async () =>{
    const data  = await fetch("https://api.themoviedb.org/3/movie/upcoming?page=1", API_OPTIONS);
    const json = await data.json();
    console.log(json.results);
    Dispatch(addUpcomingMovies(json.results));
  }

  useEffect(()=>{
    getUpcomingMovies();
  }, [])
}

export default useUpcomingMovies;