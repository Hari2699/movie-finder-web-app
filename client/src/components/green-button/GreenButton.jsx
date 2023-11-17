import React from 'react';

import classes from './GreenButton.module.css';

const GreenButton = ({ content }) => {
    return <div className={ classes.greenButton }> { content.toUpperCase() } </div>
}

export default GreenButton;