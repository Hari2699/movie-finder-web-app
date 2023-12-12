import React from 'react';

import classes from './DetailsTopRow.module.css';

const DetailsTopRow = ({ content }) => {

    const stylesMap = {
        'genre': classes.genreDiv,
        'released': classes.detailsText,
        'ratings': classes.ratingsDiv,
        'languages': classes.languageText,
        // 'platforms': classes.platformDiv
    }

    return (
        <div className={ classes.detailsRow } >
            <div className={ classes.detailsTag } >
                { content.name.toUpperCase() }
            </div>
            <div className={ stylesMap[content.name] } >
                { content.content }
            </div>
        </div>
    )
}

export default DetailsTopRow;