import React, { useEffect, useState } from "react";
import "./MovieList.css";
import { useParams } from "react-router-dom";
import Card from "../Card/Card";

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);
  const [error, setError] = useState(null);
  const { type } = useParams();

  useEffect(() => {
    const getData = async () => {
      setError(null);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${
            type ? type : "popular"
          }?api_key=7e7c5aca22fe4eaf6dc73b447f349e7c&language=en-US`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setMovieList(data.results || []);
      } catch (err) {
        setError(err.message);
      }
    };

    getData();
  }, [type]);

  return (
    <div className="movie__list">
      <h2 className="list__title">{(type ? type : "POPULAR").toUpperCase()}</h2>
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
