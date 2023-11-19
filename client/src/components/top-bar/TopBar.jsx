import React from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import classes from './TopBar.module.css';

const TopBar = ({ title }) => {
    

    const history = useHistory();

    const goBack = () => {
        history.goBack();
    }

    return(
        <div className={ classes.topBar }>
            <div className={ classes.backIcon } onClick={ goBack }>
                <i className='fa fa-arrow-left'></i>
            </div>
            <div className={ classes.title }>
                { title.toUpperCase() }
            </div>
            <Link to="/">
            <div className={ classes.homeIcon }>
                <i className="fa fa-home"></i>
            </div>
            </Link>
        </div>
    )
}

export default TopBar;