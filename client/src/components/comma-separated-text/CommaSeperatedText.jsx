import React from 'react';


const CommaSeperatedText = ({ textArray = []}) => {
    return (
        <>
            { 
                textArray.map((text,idx) => (
                    <span key={ idx } > 
                        { (idx + 1) === textArray.length ? text.toUpperCase() : `${text.toUpperCase()}, ` } 
                    </span>
                )) 
            }   
        </>
    )
}

export default CommaSeperatedText;
