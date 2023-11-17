import React from 'react';

import classes from './Poster.module.css';

const Poster = ({ posterImage, trailerLink }) => {
    return (
        <div className={ classes.posterDiv }>
            <div className={ classes.posterWrapper }>
                <img src={ posterImage } alt={ "title" } />
            </div>
            
            {
                trailerLink && (
                    <a href={ trailerLink } target="_blank" rel="noreferrer" className={ classes.trailerBtn }>
                        Watch Trailer
                        <i className="fab fa-youtube" style={{ fontSize: '20px' }}></i>
                    </a>
                )
            }
        </div>
    )
}

export default Poster;