import React, { useEffect, useState } from "react";
import classes from './Searchbar.module.css'
import { useMovies } from '../../context/movies/movieState'

import searchImage from '../../assets/Images/search.png'
import Notification from '../../services/NotificationService';


const Searchbar = ({ onSearch }) => {
    const { searchQuery } = useMovies();
    const [text, setText] = useState(searchQuery || '');
    
    const performSearch = async (e) => {
        try {
            e.preventDefault();
            if (text.length === 0) {
                Notification.show({
                    message: 'Cannot search movies for an empty query. Type something',
                    status: false
                });
                return;
            }
            onSearch(text);
        } catch (error) {
            console.error('Error while performing search:', error);
            Notification.show({
                message:error,
                status:false
            });
        }
    };

    const changeText = (e) => {
        setText(e.target.value)
    }

    return (
        <div className={ classes.searchbarDiv }>
            <form onSubmit={ performSearch } className={ classes.searchForm }>
                <input onChange={ changeText } value={ text } type="text" placeholder="Enter a movie name..." />
                <div className={ classes.searchButton } onClick={ performSearch }>
                    <div className={ classes.searchImage }>
                        <img src={searchImage} alt="search" />
                    </div>
                </div>
                <input type="submit" hidden />
            </form>
        </div>
    )
}

export default Searchbar;