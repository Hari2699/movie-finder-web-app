import React from 'react';

import classes from './RatingContents.module.css';

import imdbImage from '../../assets/Images/IMDB.png';
import tomatoImage from '../../assets/Images/tomato.png';


const RatingContents = ({ratingsArray}) => { 

    if(ratingsArray.length === 0){
        return ( <span className={ classes.detailsText }>N/A</span> )
    }
    return (
        <>
        {   
            ratingsArray.map((rating) => {
                if (rating.Source === 'Internet Movie Database') {
                    return (
                        <div key={ rating.Source } className={ classes.ratingsRow }>
                            <div className={ classes.ImdbImage } >
                                <img src={ imdbImage } alt="IMDB"/>
                            </div>
                            <div className={ classes.detailsText } >
                                {rating.Value}
                            </div>
                        </div>
                    )
                }
                if (rating.Source === 'Rotten Tomatoes') {
                    return (
                        <div key={ rating.Source } className={ classes.ratingsRow } >
                            <div className={ classes.TomatoImage } >
                                <img src={ tomatoImage } alt="RT"/>
                            </div>
                            <div className={ classes.detailsText } >
                                { rating.Value }
                            </div>
                        </div>
                    )
                }
                return <></>
                
            } )
        }
            
            
        </>
        )
}

export default RatingContents;