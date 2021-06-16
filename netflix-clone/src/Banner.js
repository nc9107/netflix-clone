import React, { useState, useEffect } from "react";
import axios from "./axios";
import requests from "./request.js";
import './Banner.css'

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length)
        ]
      );
      return request;
    }
    fetchData();
  }, []);


  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        // '?' is if the movie ever is undefined, it won't freak out and handle gracefully.
        backgroundImage: `url(
                    "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
                )`,
        backgroundPosition: "center center",
      }}
    >
      {/* Backround image to header */}
      <div className="banner_contents">
        {/* title */}
        <h1 className="banner_title">{movie?.title || movie?.name || movie?.original_name}</h1>

        {/* div.banner_buttons>buttons.banner_button*2  */}
        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My List</button>
        </div>
              
        <h1 className="banner_description">
            {truncate(movie?.overview,150)}
        </h1>    
        
      </div>
      <div className="banner_fadeBottom" />
      
      {/* div 2 buttons" Play and My List */}
      {/* Description */}
    </header>
    
  );
    }

export default Banner;
