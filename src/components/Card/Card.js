import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import "./Card.css";
import { Link } from "react-router-dom";

const Card = ({ movie }) => {
  console.log(movie);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="cards">
          <SkeletonTheme color="#202020" highlightColor="#444">
            <Skeleton height={300} duration={2} />
          </SkeletonTheme>
        </div>
      ) : (
        <Link
          to={`/movie/${movie?.id}`}
          style={{ textDecoration: "none", color: "white" }}
        >
          <div className="cards">
            <img
              className="cards__img"
              src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
              alt={movie?.original_title}
            />
            <div className="cards__overlay">
              <div className="card__title">{movie?.original_title}</div>
              <div className="card__runtime">
                {movie?.release_date}
                <span className="card__rating">
                  <FontAwesomeIcon icon={faStar} className="icon" />
                  {movie?.vote_average}
                </span>
              </div>
              <div className="card__description">
                {movie?.overview.slice(0, 118) + "..."}
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default Card;
