import React from 'react';
import classes from './MovieDisplay.module.css';
import MovieCard from '../movie-card/MovieCard'

const MovieDisplay = ({movies}) => { 
 
    return (
        <div className={ classes.movieRow }>
            <div className={ classes.MovieReel }>
                
                {
                    movies.map((movie, idx) => (
                        <MovieCard key={ idx } movie={ movie } />
                    ))
                }   
            </div>
        </div>
    )
} 

export default MovieDisplay;