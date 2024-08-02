import React, { useState, useEffect } from "react";
import "./MovieSearch.css";

const MovieSearch = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const apiKey = process.env.REACT_APP_TMDB_API_KEY; // Replace with your TMDb API key
  const language = "en-US";

  useEffect(() => {
    if (searchInput) {
      const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=${language}&query=${searchInput}`;
      
      const fetchData = async () => {
        try {
          const response = await fetch(apiUrl);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setSearchResults(data.results);
        } catch (error) {
          setError(error.message); // Set the error message
        }
      };

      fetchData();
    } else {
      setSearchResults([]); // Clear results when searchInput is empty
    }
  }, [searchInput, apiKey, language]);

  const strShortLength = (str) => {
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
      {error && <p className="error-message">Something went wrong: {error}</p>}
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
            <p className="overview">{strShortLength(movie.overview)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieSearch;
