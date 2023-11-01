import React from "react";
import { Link } from "react-router-dom";
import classes from "./MovieRow.module.css";
import MovieCard from "../movie-card/MovieCard";

const MovieRow = ({ title, movies, transparentBg, alternateMsg, pathname, limit }) => {
  let moviesArr = limit ? movies.slice(0, 10) : movies;
  
  let msg = alternateMsg ? (
    <h2 className={classes.alternateMsg}>{alternateMsg}</h2>
  ) : (
    <h2 className={classes.alternateMsg}>No movies to show</h2>
  );
  let movieRowContent = movies.length === 0 ? (
      msg
    ) : (
      <>
        {moviesArr.map((movie, idx) => (
          <MovieCard key={idx} movie={movie} />
        ))}
      </>
    );

  return (
    <div className={classes.movieRow}>
      <div
        style={
          transparentBg === undefined ? { backgroundColor: "#0E1111" } : null
        }
        className={classes.movieRowHeader}
      >
        <div className={classes.headerLink}>
          {movies.length > 10 && pathname.length !== 0 ? (
            <Link
              to={{ pathname, state: { title, movies } }}
              className={classes.headerLink}
            >
              <h2>{title}</h2>
              <i className="fas fa-arrow-right"></i>
            </Link>
          ) : (
            <h2 className={ classes.defaultCursor }>{title}</h2>
          )}
        </div>
      </div>

      <div
        style={
          transparentBg === undefined ? { backgroundColor: "#0E1111" } : null
        }
        className={classes.MovieReel}
      >
        {movieRowContent}
      </div>
    </div>
  );
};

export default MovieRow;
