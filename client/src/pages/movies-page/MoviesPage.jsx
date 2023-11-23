
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
    const { getMovieById, getMovieCredits, getSimilarMovies } = useMovies()
    const { id: movieId } = useParams();
    
    const [movie, setMovie] = useState({
        title: "Movie Name",
        genres: [],
        release_date: "01-01-1000",
        posterPath: "",
        vote_average: 0,
        languages: [],
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
                const creditsData = await getMovieCredits(movieId);
                setCreditData(creditsData);
                const similarMovies = await getSimilarMovies(movieId);
                setSimilarMovies(similarMovies);
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
        let updatedMovieData = {...movieData};
    
        if (Array.isArray(movieData.spoken_languages)) {
            const languages = movieData.spoken_languages.map(lang => lang.english_name);
            updatedMovieData.spoken_languages = languages;
        }
        setMovie(updatedMovieData);
    }

    const setCreditData = (creditsData) => {
        const directors = creditsData.data.crew
            .filter(member => member.known_for_department === 'Directing')
            .map(director => director.name) || [];

        const writers = creditsData.data.crew
            .filter(member => member.known_for_department === 'Writing')
            .map(writer => writer.name) || [];

        const stars = creditsData.data.cast.slice(0, 10).map(actor => actor.name) || [];
        setMovie(prevMovie => ({
            ...prevMovie,
            director: directors,
            writer: writers,
            actors: stars
        }));
    }

    const setSimilarMovies = (similarMovies) => {
        const similarmovies = similarMovies.data.results || [];
        setMovie(prevMovie => ({
            ...prevMovie,
            similarMovies: similarmovies
        }));
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
                                <Poster posterImage= {`https://image.tmdb.org/t/p/w300${movie.poster_path}`} 
                                trailerLink={ movie.trailer } 
                                />
                            </div>
                            <div className={ classes.rightDiv }>
                                <DetailsTop
                                    genres={ movie.genres }
                                    released={ movie.release_date }
                                    ratings={ movie.vote_average }
                                    languages={ movie.spoken_languages }
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
                    <MovieRow title="Related Movies" movies={movie.similarMovies || []} pathname=" " transparentBg={true} />
                </div>
          <Footer />
            </>
        )
    }
    
    return content
}
export default MoviePage;
