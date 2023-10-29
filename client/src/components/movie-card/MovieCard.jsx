import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import classes from './MovieCard.module.css'

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


const MovieCard = ({ movie }) => {

    const [ showHover, setShowHover ] = useState(false)
    
    const id = movie.id ? movie.id : movie.movie_id

    return (
        <div className={ classes.Movie }>
            <Link to={ `/movie/${id}` } 
                onTouchStart={ () => setShowHover( true ) }
                onTouchEnd={ () => setShowHover( false )  } 
                onMouseEnter={ () => setShowHover( true ) } 
                onMouseLeave={ () => setShowHover( false ) }
            >

                {
                    showHover ?
                    <div className={ classes.hoverCard } >
                        { movie.title.toUpperCase() }
                    </div> 
                    : null
                }
                <LazyLoadImage 
                    src={movie.posterPath} 
                    alt={movie.title} 
                    effect="blur"
                    height='100%'
                    width='100%'
                />
            </Link>
        </div>
    )
}

export default MovieCard
