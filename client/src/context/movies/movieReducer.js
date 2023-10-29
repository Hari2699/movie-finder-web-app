import { HOME, SEARCH, SET_HISTORY, PREV_SEARCH, SET_HISTORY_FROM_API, SET_RECOMMENDATION } from '../types';

export const localStoreUtil = (key) => {
    let foundArr = sessionStorage.getItem(key)
    
    if (!foundArr) {
        
        foundArr = []
        return foundArr
    }
    
    foundArr = JSON.parse(foundArr)
    
    return foundArr
}

const movieReducer = (state, action) => {
    switch (action.type) {
        case HOME :
            return {
                ...state,
                mostPopular: action.payload.mostPopular,
                latestReleases: action.payload.latestReleases,
                topRated: action.payload.topRated,
                recommended: action.payload.recommended,
                genreMovies: action.payload.genreMovies 
            }
            
        case PREV_SEARCH:
            return {
                ...state,
                searchResults: action.payload.searchResults,
                searchQuery: action.payload.query
            }
        
        case SEARCH:
            let prevResults = localStoreUtil('prevSearches')
            
            prevResults = [
                ...prevResults,
                {
                    query: action.payload.query,
                    searchResults: action.payload.searchResults
                }
            ]
            
            sessionStorage.setItem('prevSearches', JSON.stringify(prevResults))
            
            return {
                ...state,
                searchResults: action.payload.searchResults,
                searchQuery: action.payload.query
            }
        
        case SET_HISTORY:
            let historyMovies = localStoreUtil('history')
            
            let foundMovies;
            
            if (action.payload.movie.id) {
                foundMovies = historyMovies.filter((movie) =>
                    movie.id !== action.payload.movie.id &&
                    movie.movie_id !== action.payload.movie.id)
            }
            if (action.payload.movie.movie_id) {
                foundMovies = historyMovies.filter((movie) =>
                    movie.id !== action.payload.movie.movie_id &&
                    movie.movie_id !== action.payload.movie.movie_id)
            }
            
            historyMovies = [action.payload.movie, ...foundMovies]
            
            sessionStorage.setItem('history', JSON.stringify(historyMovies))
            
            return {
                ...state,
                history: [...historyMovies]
            }
        
        case SET_HISTORY_FROM_API:
            sessionStorage.setItem('history', JSON.stringify(action.payload.history))
            
            return {
                ...state,
                history: action.payload.history
            }
        
        case SET_RECOMMENDATION:
            const homeMovies = localStoreUtil('homepage')
            
            const updated = {
                ...homeMovies,
                recommended: action.payload.recommended
            }
            
            sessionStorage.setItem('homepage', JSON.stringify(updated))
            
            return {
                ...state,
                recommended: action.payload.recommended
            }
        
        default:
            return state;
    }
}

export default movieReducer