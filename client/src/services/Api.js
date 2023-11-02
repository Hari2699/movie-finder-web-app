// const axios = require("axios");

export const API_KEY = '7af1cba5c48ce69c437e486757fef8f7';
export const BASE_URL = 'https://api.themoviedb.org/3';
// const omdbApiKey = "de60d00e";

// Extracting movies particular information
// const cleanMovieData = (data) => {
//   const movieList = [];


//   for (let movie of data) {
//     let poster = `https://image.tmdb.org/t/p/original${movie.poster_path}`
//     if (movie.poster_path === null) {
//       poster = 'https://image.freepik.com/free-photo/retro-film-reel-burn-background_271825-14.jpg'
//     }
//     movieList.push({
//       id: movie.id,
//       posterPath: poster,
//       title: movie.title,
//       genre_ids: movie.genre_ids,
//       release_date: movie.release_date,
//       popularity: movie.popularity,
//       vote_avgerage: movie.vote_average
//     });
//   }
//   return movieList;
// };

// // API call for every search query
// exports.searchMovies = async (query) => {
//   try {
//     // API call response
//     const res = await axios.get(
//       `https://api.themoviedb.org/3/search/movie?api_key=${tmdbApiKey}&query=${query}`
//     );

//     // Extracting result
//     const result = res.data.results;

//     // Throws error message if result is empty
//     if (!result) {
//       const error = new Error(
//         "Could not find any result for this search : '" + query + "'"
//       );
//       error.statusCode = 404;
//       throw error;
//     }

//     // Returns result
//     return cleanMovieData(result);
//   } catch (err) {
//     if (!err.statusCode) err.statusCode = 500;
//     throw err;
//   }
// };

// // API call for mostpopular movies
// exports.mostPopularMovies = async () => {
//   try {
//     // API call response
//     const res = await axios.get(
//       `https://api.themoviedb.org/3/movie/popular?api_key=${tmdbApiKey}&language=en-US&page=1`
//     );

//     // Extracting result
//     const result = res.data.results;
    
//     // Throws error message if result is empty
//     if (!result) {
//       const error = new Error("Could not find any most popular movies");
//       error.statusCode = 404;
//       throw error;
//     }
    
//     result.sort(() => Math.random() - 0.5)

//     // Returns result
//     return cleanMovieData(result);
//   } catch (err) {
//     if (!err.statusCode) err.statusCode = 500;
//     throw err;
//   }
// };

// // API call for latest release movies
// exports.latestReleaseMovies = async () => {
//   try {
//     // API call response
//     const res = await axios.get(
//       `https://api.themoviedb.org/3/movie/now_playing?api_key=${tmdbApiKey}&language=en-US&page=1`
//     );

//     // Extracting result
//     const result = res.data.results;

//     // Throws error message if result is empty
//     if (!result) {
//       const error = new Error("Could not find any latest realease movies");
//       error.statusCode = 404;
//       throw error;
//     }
//     // Returns result
//     return cleanMovieData(result);
//   } catch (err) {
//     if (!err.statusCode) err.statusCode = 500;
//     throw err;
//   }
// };

// // API call for top rated movies
// exports.topRatedMovies = async () => {
//   try {
//     // API call response
//     const res = await axios.get(
//       `https://api.themoviedb.org/3/movie/top_rated?api_key=${tmdbApiKey}&language=en-US&page=1`
//     );

//     // Extracting result
//     const result = res.data.results;

//     // Throws error message if result is empty
//     if (!result) {
//       const error = new Error("Could not find any top rated movies");
//       error.statusCode = 404;
//       throw error;
//     }

//     // Returns result
//     return cleanMovieData(result);
//   } catch (err) {
//     if (!err.statusCode) err.statusCode = 500;
//     throw err;
//   }
// };

// // API call for single movie information
// exports.getMovieById = async (movieId) => {
//   try {
//     // API call for movie information
//     const { data: movie } = await axios.get(
//       `https://api.themoviedb.org/3/movie/${movieId}?api_key=${tmdbApiKey}&language=en-US&append_to_response=watch%2Fproviders`
//     );
    
//     const { data: videos } = await axios.get(
//       `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${tmdbApiKey}&language=en-US`
//     )
    
//     let trailer = videos.results.length
//       ? videos.results.filter((video) => video.type === 'Trailer' && video.site === 'YouTube')
//       : ""
    
//     if (trailer.length) {
//       trailer = `https://youtu.be/${ trailer[0].key }`
//     }
    
//     // API call to get ratings of a movie
//     const {
//       data: {
//         Ratings: ratings,
//         Director: director,
//         Writer: writer,
//         Actors: actors,
//         Language: language,
//         Released: release_date,
//         Runtime: runtime
//       },
//     } = await axios.get(
//       `https://www.omdbapi.com/?i=${movie.imdb_id}&apiKey=${omdbApiKey}`
//       );
      
//     // Throws error message if result is empty
//     if (!movie) {
//       const error = new Error(
//         "Could not find any movie information for this id = " + movieId
//       );
//       error.statusCode = 404;
//       throw error;
//     }

//     // Initializing streaming service as empty
//     let streaming = [];
    
//     const providers = movie["watch/providers"].results.IN
    
//     for (let key in providers) {
//       if (key === 'link') {
//         continue
//       }
//       providers[key].map((provider) => {
//         streaming.push({
//           logoPath: `https://image.tmdb.org/t/p/original${provider.logo_path}`,
//           providerName: provider.provider_name,
//           providerId: provider.provider_id
//         })
//       })
//     }
    
//     const map = new Map()
//     const streamingData = []
    
//     for (const item of streaming) {
//       if (!map.has(item.providerId)) {
//         map.set(item.providerId, true)
//         streamingData.push(item)
//       }
//     }

//     // Response data
//     const result = {
//       id: movie.id,
//       language: language ? language.split(', ') : ['N/A'],
//       plot: movie.overview,
//       posterPath: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
//       releaseDate: release_date ? release_date : 'N/A',
//       title: movie.title,
//       ratings: ratings ? ratings : [],
//       genres: movie.genres,
//       streaming: streamingData,
//       director: director ? director.split(', ') : ['N/A'],
//       writer: writer ? writer.split(', ') : ['N/A'],
//       actors: actors ? actors.split(', ') : ['N/A'],
//       runtime: runtime ? runtime : 'N/A',
//       trailer: trailer
//     };
    
//     // Returns movie information
//     return result;
//   } catch (err) {
//     if (!err.statusCode) err.statusCode = 500;
//     throw err;
//   }
// };

// // API call for similar movies
// exports.similarMovies = async (movieId) => {
//   try {
//     // API call response
//     const res = await axios.get(
//       `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${tmdbApiKey}&language=en-US&page=1`
//     );

//     // Extracting result
//     const result = res.data.results.slice(0, 9);

//     // Throws error message if result is empty
//     if (!result) {
//       const error = new Error(
//         "Could not find any similar movies for this id = " + movieId
//       );
//       error.statusCode = 404;
//       throw error;
//     }
    
//     // Returns result
//     return cleanMovieData(result);
//   } catch (error) {
//     if (!error.statusCode) error.statusCode = 500;
//     throw error;
//   }
// };

// // API call for movies recommendation
// exports.getRecommendation = async (movieId) => {
//   try {
//     // API call response
//     const res = await axios.get(
//       `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=4319d4a9f030d2b54cb91ed1330effce&language=en-US&page=1`
//     );

//     // Extracting result
//     const result = res.data.results;

//     // Throws error message if result is empty
//     if (!result) {
//       const error = new Error(
//         "Could not find any recommendation for this id = " + movieId
//       );
//       error.statusCode = 404;
//       throw error;
//     }

//     // Returns result
//     return cleanMovieData(result);
//   } catch (err) {
//     if (!err.statusCode) err.statusCode = 500;
//     throw err;
//   }
// };

// exports.getAllGenreMovies = async () => {
  
//   try {
//     const genres = [
//       { id: 28, name: 'Action' },
//       { id: 12, name: 'Adventure' },
//       { id: 16, name: 'Animation' },
//       { id: 35, name: 'Comedy' },
//       { id: 80, name: 'Crime' },
//       { id: 14, name: 'Fantasy' },
//       { id: 27, name: 'Horror' },
//       { id: 878, name: 'Science Fiction' },
//       { id: 53, name: 'Thriller' },
//     ]
    
//     const movies = genres.map((genre) => {
//       return axios
//         .get(`https://api.themoviedb.org/3/genre/${genre.id}/movies?api_key=${tmdbApiKey}&language=en-US`)
//         .then((res) => ({
//           id: genre.id,
//           genre: genre.name,
//           movies: cleanMovieData(res.data.results)
//         }))
//         .catch((err) => console.log(err.message))
//     })
    
//     const mov = await Promise.all(movies)
    
//     return mov
    
//   } catch (err) {
//     if (!err.statusCode) err.statusCode = 500;
//     throw err;
//   }
// }