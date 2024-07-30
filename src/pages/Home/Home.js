import React, { useEffect, useState } from "react";
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import MovieList from "../../components/MoviesList/MovieList";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/popular?api_key=7e7c5aca22fe4eaf6dc73b447f349e7c&language=en-US"
        );
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("data",data)
        setPopularMovies(data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularMovies();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="poster">
      <Carousel
        showThumbs={false}
        autoPlay={true}
        transitionTime={3}
        infiniteLoop={true}
        showStatus={false}
      >
        {popularMovies.map((movie) => (
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to={`/movie/${movie.id}`}
            key={movie.id}
          >
            <div className="posterImage">
              <img
                src={`https://image.tmdb.org/t/p/original${
                  movie && movie.backdrop_path
                }`}
                alt={movie ? movie.original_title : "Movie Poster"}
              />
            </div>
            <div className="posterImage__overlay">
              <div className="posterImage__title">
                {movie ? movie.original_title : ""}
              </div>
              <div className="posterImage__runtime">
                {movie ? movie.release_date : ""}
                <span className="posterImage__rating">
                  <FontAwesomeIcon icon={faStar} className="icon" />
                  {movie ? movie.vote_average : ""}
                </span>
              </div>
              <div className="posterImage__description">
                {movie ? movie.overview : ""}
              </div>
            </div>
          </Link>
        ))}
      </Carousel>
      <MovieList />
    </div>
  );
};

export default Home;
