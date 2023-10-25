import { createContext } from 'react'

const MovieContext = createContext({
    mostPopular: [],
    latestReleases: [],
    topRated: [],
    searchResults: [],
    genreMovies: [],
    recommended: [],
    history: [],
    searchQuery: "",
    homePageMovies: async () => { }, 
    setHistoryHandler: async (movie) => { },
    searchMovies: async (query) => { },
    getMovieById: async (movieId) => { },
    getHistory: async () => { },
    getRecommended: async () => { }
})

export default MovieContext