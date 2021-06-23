import React, { useState, useEffect } from "react";
import axios from "./axios"; //  axios is the alias for whatever we are trying to import from axios.js
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

// title is the props passed in here from App.js
const baseUrl = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  // Intialize movies tp be an empty array
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  // A snippet of code which runs based on a specific condiiton/variable
  useEffect(() => {
    // Everytime row loads, this usefeect will run.
    // When row loads, make a request to tmdb to fetch movies relating to the category.
    // Categories depend on the fetch url
    // if [], run once when the row loads, and don't run again.
    // if[movies], its going to run once when row loads and run everytime movies gets updated.

    // Calling an async function because don't know when data will be returned from the 3rd party service.
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      console.log(request.data.results);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
    // Everytime fetchUrl changes, useEffect gets called. We are using fetchUrl is because it is being passed into
    // useEffect externally.
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = async (movie) => {
    // If the trailer is already open, then close it
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          // gets value of whatever 'v' is.
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };
  return (
    <div className="row">
      {/* title */}
      <h2>{title}</h2>
      {/* Contianer -> posters */}
      <div className="row__posters">
        {/* row_poster */}
        {movies.map(
          (movie) =>
            ((isLargeRow && movie.poster_path) ||
              (!isLargeRow && movie.backdrop_path)) && (
              <img
                key={movie.id}
                onClick={() => handleClick(movie)}
                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                src={`${baseUrl}${
                  isLargeRow ? movie.poster_path : movie.poster_path
                }`}
                alt={movie.name}
              />
            )
        )}
      </div>

      {/* Check documentaion */}
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
