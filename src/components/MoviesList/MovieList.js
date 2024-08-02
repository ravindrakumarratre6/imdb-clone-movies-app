import React, { useEffect, useState } from "react";
import "./MovieList.css";
import { useParams } from "react-router-dom";
import Card from "../Card/Card";

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const apiKey = process.env.REACT_APP_TMDB_API_KEY;

  // Debugging log
  console.log("API Key:", apiKey); // Check if this logs the correct API key
  

  useEffect(() => {
    const getData = async () => {
      setError(null);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id ? id : "popular"}?api_key=${apiKey}&language=en-US`
        );
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Request URL:", `https://api.themoviedb.org/3/movie/${id ? id : "popular"}?api_key=${apiKey}&language=en-US`);
        console.log("Fetched Data:", data); // Debugging log
        setMovieList(data.results || []);
      } catch (err) {
        console.error("Error fetching data:", err); // Add this line
        setError(err.message);
      }
    };

    getData();
  }, [id, apiKey]);

  return (
    <div className="movie__list">
      <h2 className="list__title">{(id ? id : "POPULAR").toUpperCase()}</h2>
      <div className="list__cards">
        {error ? (
          <p className="error-message">{error}</p>
        ) : (
          movieList.map((movie) => <Card key={movie.id} movie={movie} />)
        )}
      </div>
    </div>
  );
};

export default MovieList;
