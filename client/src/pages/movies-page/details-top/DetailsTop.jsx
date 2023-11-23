import React from 'react';

import classes from './Details.module.css';

import RatingContents from '../../../components/rating-contents/RatingContents';
import CommaSeperatedText from '../../../components/comma-separated-text/CommaSeperatedText';
import PlatformsImages from '../../../components/platforms-images/PlatformsImages';
import GenreContents from '../../../components/genre-contents/GenreContents';
import DetailsTopRow from './details-top-row/DetailsTopRow';



const DetailsTop = (props) => {
    
    const contentMap = [
        {
            name: 'genre',
            content: <GenreContents genres={props.genres} />,
            contentClass: classes.genreDiv
        },
        {
            name: 'released',
            content: props.released ,
            conentClass: classes.detailsText
        },
        {
            name:'runtime',
            content:props.runtime,
            contentClass: classes.detailsText
        },
        {
            name: 'ratings',
            content: <RatingContents ratingValue={ props.ratings }/>,
            contentClass: classes.ratingsDiv 
        },
        {
            name:'languages',
            content: <CommaSeperatedText textArray={ props.languages || []}/>,
            contentClass: classes.languageText
        },
        {
            name: 'platforms',
            content: <PlatformsImages platforms={props.platforms} />,
            contentClass: classes.platformdiv
        }
    ]

    return (
        <div className={ classes.detailsDiv } >
            {
                contentMap.map( (content,idx) => <DetailsTopRow key={ idx } content={content} /> )
            }
        </div>
    )
}

export default DetailsTop;