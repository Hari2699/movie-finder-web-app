import React from 'react';

import classes from './PlatformsImages.module.css';

const platformsImages = ({ platforms = []}) => {
    

    return (
        <>
            { 
                platforms.length === 0 ? (<span className={ classes.noPlatformText }> N/A </span>) : (
                platforms.map( (platform,idx) => (
                    <div key={ idx } title={ platform.providerName } className={ classes.platformImage } >
                        <img src={ platform.logoPath } alt={ platform.providerName }/>
                    </div>
                ))
            )}
        </>
    )
}

export default platformsImages;