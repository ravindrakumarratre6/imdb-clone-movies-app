import axios from 'axios';
import React, { useEffect, useState } from "react";
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import MovieList from "../../components/MoviesList/MovieList";
import axiosRetry from 'axios-retry';

axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeoutWarning, setTimeoutWarning] = useState(false);
  const apiKey = process.env.REACT_APP_TMDB_API_KEY;

  console.log('API Key:', apiKey);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        if (!apiKey) {
          throw new Error("API Key is missing");
        }

        const timer = setTimeout(() => {
          setTimeoutWarning(true);
        }, 15000); // Show timeout warning after 15 seconds

        console.log(`Fetching popular movies with API key: ${apiKey}`);

        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US`,
          { timeout: 20000 } // Setting a 20-second timeout
        );

        clearTimeout(timer); // Clear the timer if request is successful

        const data = response.data;
        console.log("Fetched data:", data);
        setPopularMovies(data.results);
      } catch (error) {
        console.error("Failed to fetch popular movies:", {
          message: error.message,
          config: error.config,
          code: error.code,
          response: error.response,
        });
        setError("Error fetching data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPopularMovies();
  }, [apiKey]);

  if (loading) {
    return (
      <div>
        Loading...
        {timeoutWarning && <div className="timeout-warning">This is taking longer than usual. Please be patient.</div>}
      </div>
    );
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
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.original_title}
              />
            </div>
            <div className="posterImage__overlay">
              <div className="posterImage__title">
                {movie.original_title}
              </div>
              <div className="posterImage__runtime">
                {movie.release_date}
                <span className="posterImage__rating">
                  <FontAwesomeIcon icon={faStar} className="icon" />
                  {movie.vote_average}
                </span>
              </div>
              <div className="posterImage__description">
                {movie.overview}
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
