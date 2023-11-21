import React from 'react';

import classes from './RatingContents.module.css';

//import imdbImage from '../../assets/Images/IMDB.png';
//import tomatoImage from '../../assets/Images/tomato.png';


const RatingContents = ({ ratingValue }) => {
    if (ratingValue === undefined || ratingValue === null) {
        return <span className={classes.detailsText}>N/A</span>;
    }
    const formattedRating = ratingValue.toFixed(1);
    return (
        <div className={classes.detailsText}>
            Rating: {formattedRating}
        </div>
    );
}

export default RatingContents;