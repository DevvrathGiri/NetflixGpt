import {addPopularMovies } from "../Utils/movieSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { API_OPTIONS } from "../Utils/constants"
const usePopularMovies = () =>{
      const Dispatch = useDispatch();
  const getPopularMovies = async () =>{
    const data  = await fetch("https://api.themoviedb.org/3/movie/popular?page=1", API_OPTIONS);
    const json = await data.json();
    console.log(json.results);
    Dispatch(addPopularMovies(json.results));
  }

  useEffect(()=>{
    getPopularMovies();
  }, [])
}

export default usePopularMovies;