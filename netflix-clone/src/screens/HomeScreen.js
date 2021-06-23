import "../App.css";
//import './HomeScreen.css';
import React from "react";
import Row from "../Row";
import requests from "../request";
import Banner from "../Banner";
import Nav from "../Nav";

// Padding creates extra space between an element's content and
// its border whereas margin creates space around an element.

function HomeScreen() {
  return (
    <div className="homeScreen">
      {/* NavBar */}
      <Nav />

      {/* Banner */}
      <Banner />
      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow={true}
      />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
    </div>
  );
}

export default HomeScreen;
