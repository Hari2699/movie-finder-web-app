import React from 'react';

import GreenButton from '../green-button/GreenButton';

const GenreContents = ({ genres }) => {
    return (
        <>
            {
                genres.map(
                    (genre,idx) => ( <GreenButton key={ idx } content={ genre.name }/> )
                )
            }
        </>
    )
}

export default GenreContents;