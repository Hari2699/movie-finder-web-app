import React, { useReducer, useContext } from 'react'
import { HOME, SEARCH, SET_HISTORY, PREV_SEARCH, SET_HISTORY_FROM_API, SET_RECOMMENDATION } from '../types'
import MovieContext from './movieContext'
import movieReducer from './movieReducer'
import { useAuth } from '../auth/authState'
import { localStoreUtil } from '../movies/movieReducer'


import axios from 'axios';
import errorResponse from '../../utils/errorResponse'

const initialState = {
    mostPopular: [],
    latestReleases: [],
    topRated: [],
    searchResults: [],
    recommended: [],
    history: [],
    genreMovies: [],
    searchQuery: ""
}

export const useMovies = () => {
    return useContext(MovieContext)
}

const MovieProvider = (props) => {
    const { token } = useAuth()
    
    const [state, dispatch] = useReducer(movieReducer, initialState)
    
    const homePageMovies = async () => {
        try {
            let collections
            // cache for home page movies
            if (sessionStorage.getItem('homepage')) {
                collections = JSON.parse(sessionStorage.getItem('homepage'))
            } else {
                const { data } = await axios.get('/api/movies/home', !token ? {
                    headers: {
                        Authorization: `Bearer ${ token }`
                    }
                } : null);
                collections = data.moviesCollection;
                
                sessionStorage.setItem('homepage', JSON.stringify(collections))
                
                dispatch({
                    type: SET_HISTORY_FROM_API,
                    payload: {
                        history: collections.viewHistory
                    }
                })
            }
            
            dispatch({
                type: HOME,
                payload: {
                    mostPopular: collections.popular,
                    latestReleases: collections.latestRelease,
                    topRated: collections.topRated,
                    recommended: collections.recommended,
                    genreMovies: collections.genreMovies
                }
            })

        } catch (error) {
            errorResponse(error)
        }
    }
    
    const searchMovies = async (query) => {
        try {
            const prevSearches = localStoreUtil('prevSearches')
            
            const result = prevSearches.find((res) => res.query.toLowerCase() === query.toLowerCase())
            if (result) {
                if(result.searchResults.length === 0){
                    throw new Error("No movies found")
                }
                dispatch({
                    type: PREV_SEARCH,
                    payload: {
                        searchResults: result.searchResults,
                        query
                    }
                })
            } else {
                const { data } = await axios.post("/api/movies/search", { query });
                
                dispatch({
                    type: SEARCH,
                    payload: {
                        searchResults: data.searchResults,
                        query
                    }
                })
                if(data.searchResults.length === 0){
                    throw new Error("No movies found")
                }
            }

        } catch (error) {
            errorResponse(error)
        }
    }
    
    const getMovieById = async (movieId) => {
        try {
            movieId = parseInt(movieId)
            
            let historyMovies = localStoreUtil('history')
            if (!historyMovies) {
                console.log("getMovieById - No history movies found, initializing to empty array.");
                historyMovies = [];
            }
            const movie = historyMovies.find((histMov) => histMov.id === movieId)
            if (movie) {
                await setHistoryHandler(movie)
                return movie
            } else {
                const { data } = await axios.get(
                    `http://127.0.0.1:8000/api/movies/details/${movieId}`,token ? {
                        headers: {
                            Authorization: `Bearer ${token}` 
                        }
                    } : null
                );
                await setHistoryHandler(data)
                return data
            }
        } catch (error) {
            errorResponse(error)
        }
    }
    
    const getMovieCredits = async (movieId) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/movies/credits/${movieId}`);
            return response;
        } catch (error) {
            errorResponse(error);
        }
    };

    const getSimilarMovies = async (movieId) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/movies/similar/${movieId}`);
            return response;
        } catch (error) {
            errorResponse(error);
        }
    };

    const setHistoryHandler = async (movie) => {
        try{
            const historyMovies = localStoreUtil('history')
            const historyLen = historyMovies.length
            
            if (token && historyLen > 0 && historyMovies[0].id !== movie.id) {
                await axios.post(
                    '/api/movies/history',
                    { movieId: movie.id },
                    {
                        headers: {
                            Authorization: `Bearer ${ token }`
                        }
                    }
                )
            }
            
            dispatch({
                type: SET_HISTORY,
                payload: {
                    movie
                }
            })
        }
        catch(error){
            errorResponse(error)
        }
    }
    
    const getRecommended = async () => {
        try{
            const homeMovies = localStoreUtil('homepage')
            
            if (token && !homeMovies.recommended.length && state.history.length >= 5) {
                const { data } = await axios.get('/api/movies/recommended', {
                    headers: {
                        Authorization: `Bearer ${ token }`
                    }
                })
                
                dispatch({
                    type: SET_RECOMMENDATION,
                    payload: {
                        recommended: data.recommended
                    }
                })
            }
        }
        catch(error){
            errorResponse(error)
        }
    }
    
    const getHistory = async () => {
        try{
            let historyMovies = localStoreUtil('history')
            if (token && historyMovies.length === 0) {
                const { data } = await axios.get('/api/movies/history', {
                    headers: {
                        Authorization: `Bearer ${ token }`
                    }
                })
                
                dispatch({
                    type: SET_HISTORY_FROM_API,
                    payload: {
                        history: data.history
                    }
                })
                historyMovies = data.history
            }
            return historyMovies
        }
        catch(error){
            errorResponse(error)
        }
        
    }
    
    const values = {
        mostPopular: state.mostPopular,
        latestReleases: state.latestReleases,
        topRated: state.topRated,
        searchResults: state.searchResults,
        history: state.history,
        recommended: state.recommended,
        searchQuery: state.searchQuery,
        genreMovies: state.genreMovies,
        setHistoryHandler,
        homePageMovies,
        searchMovies,
        getMovieById,
        getMovieCredits,
        getSimilarMovies,
        getHistory,
        getRecommended
    }
    
    return (
        <MovieContext.Provider value={ values }>
            { props.children }
        </MovieContext.Provider>
    )
}

export default MovieProvider