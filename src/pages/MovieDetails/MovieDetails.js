import React, { useEffect, useState } from "react";
import "./MovieDetails.css";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
  const [currentMovieDetail, setMovie] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getData = () => {
      fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=7e7c5aca22fe4eaf6dc73b447f349e7c&language=en-US`
      )
        .then((res) => res.json())
        .then((data) => setMovie(data));
    };

    getData();
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="movie">
      <div className="movie__intro">
        <img
          className="movie__backdrop"
          src={`https://image.tmdb.org/t/p/original${
            currentMovieDetail?.backdrop_path || ""
          }`}
          alt={`${currentMovieDetail?.original_title || "Movie backdrop"}`}
        />
      </div>
      <div className="movie__detail">
        <div className="movie__detailLeft">
          <div className="movie__posterBox">
            <img
              className="movie__poster"
              src={`https://image.tmdb.org/t/p/original${
                currentMovieDetail?.poster_path || ""
              }`}
              alt={`${currentMovieDetail?.original_title || "Movie poster"}`}
            />
          </div>
        </div>
        <div className="movie__detailRight">
          <div className="movie__detailRightTop">
            <div className="movie__name">
              {currentMovieDetail?.original_title || ""}
            </div>
            <div className="movie__tagline">
              {currentMovieDetail?.tagline || ""}
            </div>
            <div className="movie__rating">
              {currentMovieDetail?.vote_average || ""}{" "}
              <i className="fas fa-star" />
              <span className="movie__voteCount">
                {currentMovieDetail
                  ? `(${currentMovieDetail.vote_count} votes)`
                  : ""}
              </span>
            </div>
            <div className="movie__runtime">
              {currentMovieDetail ? `${currentMovieDetail.runtime} mins` : ""}
            </div>
            <div className="movie__releaseDate">
              {currentMovieDetail
                ? `Release date: ${currentMovieDetail.release_date}`
                : ""}
            </div>
            <div className="movie__genres">
              {currentMovieDetail?.genres?.map((genre) => (
                <span className="movie__genre" id={genre.id} key={genre.id}>
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
          <div className="movie__detailRightBottom">
            <div className="synopsisText">Synopsis</div>
            <div>{currentMovieDetail?.overview || ""}</div>
          </div>
        </div>
      </div>
      <div className="movie__links">
        <div className="movie__heading">Useful Links</div>
        {currentMovieDetail?.homepage && (
          <a
            href={currentMovieDetail.homepage}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <p>
              <span className="movie__homeButton movie__Button">
                Homepage <i className="newTab fas fa-external-link-alt"></i>
              </span>
            </p>
          </a>
        )}
        {currentMovieDetail?.imdb_id && (
          <a
            href={`https://www.imdb.com/title/${currentMovieDetail.imdb_id}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <p>
              <span className="movie__imdbButton movie__Button">
                IMDb <i className="newTab fas fa-external-link-alt"></i>
              </span>
            </p>
          </a>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
