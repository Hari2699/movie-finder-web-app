import React from 'react';

import classes from './PlatformsImages.module.css';

const setStreamingPlatforms = (platformsData) => {
    const allPlatforms = [];
    if (platformsData && platformsData.results) {
        Object.values(platformsData.results).forEach(country => {
            ['flatrate', 'buy', 'rent'].forEach(type => {
                if (country[type]) {
                    country[type].forEach(provider => {
                        allPlatforms.push({
                            providerName: provider.provider_name,
                            logoPath: `https://image.tmdb.org/t/p/original${provider.logo_path}`
                        });
                    });
                }
            });
        });
    }
    const uniquePlatforms = Array.from(new Set(allPlatforms.map(p => p.providerName)))
                                 .map(name => {
                                     return allPlatforms.find(p => p.providerName === name)
                                 });
                                }

const platformsImages = ({ platforms = []}) => {


    return (
        <>
            { 
                platforms.length === 0 ? (<span className={ classes.noPlatformText }> N/A </span>) : (
                platforms.map( (platform,idx) => (
                    <div key={ idx } title={ setStreamingPlatforms.providerName } className={ classes.platformImage } >
                        <img src={ setStreamingPlatforms.logoPath } alt={ platform.providerName }/>
                    </div>
                ))
            )}
        </>
    )
}

export default platformsImages;