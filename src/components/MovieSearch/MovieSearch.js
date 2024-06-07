import React, { useState, useEffect } from "react";
import "./MovieSearch.css";

const MovieSearch = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const apiKey = "7e7c5aca22fe4eaf6dc73b447f349e7c"; // Replace with your TMDb API key
  const language = "en-US";

  useEffect(() => {
    if (searchInput) {
      const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=${language}&query=${searchInput}`;
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => setSearchResults(data.results))
        .catch((error) => console.error(error));
    }
  }, [searchInput, apiKey, language]);

  const strshortLength = (str) => {
    const wordArray = str.split(" ");
    return wordArray.length <= 10
      ? str
      : wordArray.slice(0, 10).join(" ") + ".....";
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search for movies"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <ul className="movies-container">
        {searchResults.map((movie) => (
          <li key={movie.id} className="movies-list">
            <img
              src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
              alt={movie.title}
              className="img"
            />
            <h3 className="titles">{movie.title}</h3>
            <p className="release-date">{movie.release_date}</p>
            <p className="overview">{strshortLength(movie.overview)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieSearch;
