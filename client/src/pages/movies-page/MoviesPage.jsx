
import React, { useEffect, useState } from 'react';
import classes from "./MoviesPage.module.css";

import { useHistory, useParams } from "react-router-dom";

import Footer from "../../components/footer/Footer";

import Poster from "./poster/Poster";
import DetailsTop from "./details-top/DetailsTop";
import Description from "./description/Description";
import TopBar from "../../components/top-bar/TopBar";
import MovieRow from "../../components/movie-row/MovieRow";
import { useMovies } from '../../context/movies/movieState';
import Preloader from '../../components/preloader/Preloader';
import Notification from '../../services/NotificationService';
import axios from 'axios';


const MoviePage = () => {
    const { getMovieById } = useMovies()
    const { id: movieId } = useParams();
    
    const [movie, setMovie] = useState({
        title: "Movie Name",
        genres: [],
        releaseDate: "01-01-1000",
        posterPath: "",
        ratings: [],
        language: [],
        streaming: [],
        actors: [],
        writer: [],
        director: [],
        runtime: "",
        plot: "",
        id: "",
        similarMovies: [],
        trailer: ""
    })
    const [isLoading, setIsLoading] = useState(false)

    const history = useHistory()
    
    useEffect(() => {
        const source = axios.CancelToken.source()

        
        const fetchMovie = async () => {
            try {
                setIsLoading(true)
                const movie = await getMovieById(movieId)
                setMovieData(movie)
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
                Notification.show({
                    message:error,
                    status: false
                })
                history.goBack()
            }
        }
        fetchMovie()
        
        return () => {
            source.cancel()
        }
    }, [movieId])
    
    const setMovieData = (movieData) => {
        setMovie(movieData)
    }
    
    let content
    
    if (isLoading) {
        content = (
            <>
                <TopBar title='Loading...' />
                <Preloader />
            </>
        )
    } else {
        content =  (
            <>
                <TopBar title={ movie.title } />
                <div className={ classes.pageWrapper }>
                    <div className={ classes.topWrapper }>
                        <div className={ classes.movieTop }>
                            <div className={ classes.leftDiv }>
                                <Poster posterImage={ movie.posterPath } trailerLink={ movie.trailer } />
                            </div>
                            <div className={ classes.rightDiv }>
                                <DetailsTop
                                    genres={ movie.genres }
                                    released={ movie.releaseDate }
                                    ratings={ movie.ratings }
                                    languages={ movie.language }
                                    platforms={ movie.streaming }
                                    runtime = { movie.runtime }
                                />
                            </div>
                        </div>
                    </div>
                    <div className={ classes.Desc }>
                        <Description
                            story={ movie.plot }
                            directors={ movie.director }
                            writers={ movie.writer }
                            stars={ movie.actors }
                        />
                    </div>
                    <MovieRow title="Related Movies" movies={movie.similarMovies} transparentBg={true} />
                </div>
          <Footer />
            </>
        )
    }
    
    return content
}
export default MoviePage;
