import React, { useEffect, useState } from "react";
// import { DropdownButton, Dropdown, ButtonGroup } from "react-bootstrap";
import classes from "./GotoPage.module.css";
import MovieDisplay from "../../components/movie-display/MovieDisplay";
import TopBar from "../../components/top-bar/TopBar";
// import { useMovies } from "../../context/movies/movieState";
import Preloader from "../../components/preloader/Preloader";
import Notification from "../../services/NotificationService";

const GotoPage = (props) => {
  // const { homePageMovies } = useMovies();

  const [title, setTitle] = useState("");
  const [moviesList, setMoviesList] = useState([]);
  // const [filterButtonName, setFilterButtonName] = useState("Genre");
  const [displayMoviesList, setDisplayMoviesList] = useState(moviesList)
  const [isLoading, setIsLoading] = useState(true)
  // const [sortTracker, setSortTracker] = useState({
  //   nameAsc: null,
  //   ratingAsc: null,
  //   releaseAsc: null,
  //   popularAsc: null,
  // });

  useEffect(() => {
    const updateMovies = async () => {
      try {
        setIsLoading(true);
        if (props.location.state) {
          const { title, movies } = props.location.state;

          setTitle(title);
          setMoviesList(movies);
        }
        else {
          // await homePageMovies();
          const homepage = JSON.parse(sessionStorage.getItem('homepage'))
          if (props.location.pathname === "/toprated") {
            setTitle("Top Rated");
            setMoviesList(homepage.topRated);
          } else if (props.location.pathname === "/mostpopular") {
            setTitle("Most Popular");
            setMoviesList(homepage.popular);
          } else if (props.location.pathname === "/latestmovies") {
            setTitle("Latest Movies");
            setMoviesList(homepage.latestRelease);
          }
        }
        setIsLoading(false);
      } catch (error) {
        Notification.show({
          message: error,
          status: false
        })
        setIsLoading(false);
      }
    };
    updateMovies();
  }, [props.location.pathname, props.location.state]);

  useEffect(() => {
    setDisplayMoviesList(moviesList)
  }, [moviesList])



  // const filters = [
  //   { id: 0, name: "No Filter" },
  //   { id: 28, name: "Action" },
  //   { id: 35, name: "Comedy" },
  //   { id: 18, name: "Drama" },
  //   { id: 27, name: "Horror" },
  //   { id: 53, name: "Thriller" },
  // ];

  // const filterMap = {
  //   0: "Genre",
  //   28: "Action",
  //   35: "Comedy",
  //   18: "Drama",
  //   27: "Horror",
  //   53: "Thriller",
  // };

  // const stringSort = () => {
  //   let isAsc = !sortTracker.nameAsc;

  //   setSortTracker({
  //     nameAsc: isAsc,
  //     ratingAsc: null,
  //     releaseAsc: null,
  //     popularAsc: null,
  //   });

  //   if (isAsc) {
  //     setDisplayMoviesList(
  //       displayMoviesList.sort((movie1, movie2) => {
  //         if (movie1.title.toLowerCase() > movie2.title.toLowerCase()) return 1;
  //         if (movie1.title.toLowerCase() < movie2.title.toLowerCase())
  //           return -1;
  //         return 0;
  //       })
  //     );
  //     return
  //   }

  //   setDisplayMoviesList(
  //     displayMoviesList
  //       .sort((movie1, movie2) => {
  //         if (movie1.title.toLowerCase() > movie2.title.toLowerCase()) return 1;
  //         if (movie1.title.toLowerCase() < movie2.title.toLowerCase())
  //           return -1;
  //         return 0;
  //       })
  //       .reverse()
  //   );
  //   return
  // };

  // const ratingSort = () => {
  //   let isRate = !sortTracker.ratingAsc;

  //   setSortTracker({
  //     ratingAsc: isRate,
  //     nameAsc: null,
  //     releaseAsc: null,
  //     popularAsc: null,
  //   });

  //   if (isRate) {
  //     setDisplayMoviesList(
  //       displayMoviesList.sort((movie1, movie2) => {
  //         return movie1.vote_avgerage - movie2.vote_avgerage;
  //       })
  //     );
  //     return
  //   }
  //   setDisplayMoviesList(
  //     displayMoviesList.sort((movie1, movie2) => {
  //       return movie1.vote_avgerage - movie2.vote_avgerage;
  //     })
  //       .reverse()
  //   );
  //   return
  // };

  // const releaseSort = () => {
  //   let isRelease = !sortTracker.releaseAsc;

  //   setSortTracker({
  //     releaseAsc: isRelease,
  //     nameAsc: null,
  //     ratingAsc: null,
  //     popularAsc: null,
  //   });
  //   if (isRelease) {
  //     setDisplayMoviesList(
  //       displayMoviesList.sort((movie1, movie2) => {
  //         return new Date(movie2.release_date) - new Date(movie1.release_date);
  //       })
  //     );
  //     return
  //   }
  //   setDisplayMoviesList(
  //     displayMoviesList.sort((movie1, movie2) => {
  //       return new Date(movie2.release_date) - new Date(movie1.release_date);
  //     })
  //       .reverse()
  //   );
  //   return
  // };

  // const popularSort = () => {
  //   let isPopular = !sortTracker.popularAsc;

  //   setSortTracker({
  //     popularAsc: isPopular,
  //     ratingAsc: null,
  //     nameAsc: null,
  //     releaseAsc: null,
  //   });
  //   if (isPopular) {
  //     setDisplayMoviesList(
  //       displayMoviesList.sort((movie1, movie2) => {
  //         return movie1.popularity - movie2.popularity;
  //       })
  //     );
  //     return
  //   }
  //   setDisplayMoviesList(
  //     displayMoviesList.sort((movie1, movie2) => {
  //       return movie1.popularity - movie2.popularity;
  //     })
  //       .reverse()
  //   );
  //   return
  // };

  // const fetchfilterMovies = (id) => {
  //   id = parseInt(id);
  //   if (id === 0) {
  //     setFilterButtonName(filterMap[0]);
  //     return moviesList;
  //   }
  //   setFilterButtonName(filterMap[id]);
  //   return moviesList.filter((movie) => movie.genre_ids.includes(id));
  // };

  // const filterSelectEvent = (id) => {
  //   setDisplayMoviesList(fetchfilterMovies(id));
  // };

  // const SortOrderIndicator = ({ tracker }) => {
  //   let content

  //   if (tracker) {
  //     content = (
  //       <span className={ classes.caretButton }>
  //         <i className="fas fa-arrow-up" aria-hidden="true"></i>
  //       </span>
  //     )
  //   } else if (tracker === false) {
  //     content = (
  //       <span className={ classes.caretButton }>
  //         <i className="fas fa-arrow-down" aria-hidden="true"></i>
  //       </span>
  //     )
  //   } else {
  //     content = null
  //   }

  //   return content
  // }

  // const FilterDropDown = ({ btnName, listValues }) => {
  //   return (
  //     <DropdownButton
  //       as={ ButtonGroup }
  //       title={ btnName.toUpperCase() }
  //       variant="outline-secondary"
  //       onSelect={ filterSelectEvent }
  //     >
  //       {listValues.map((genres) => (
  //         <Dropdown.Item key={ genres.id } eventKey={ genres.id }>{ genres.name }</Dropdown.Item>
  //       )) }
  //     </DropdownButton>
  //   );
  // };

  // const SortDropDown = ({ btnName }) => {
  //   return (
  //     <DropdownButton
  //       as={ ButtonGroup }
  //       title={ btnName }
  //       variant="outline-secondary"
  //     >
  //       <Dropdown.Item eventKey="1" onClick={ stringSort }>
  //         Name{ " " }
  //         <SortOrderIndicator tracker={ sortTracker.nameAsc } />
  //       </Dropdown.Item>
  //       <Dropdown.Item eventKey="2" onClick={ ratingSort }>
  //         Rating{ " " }
  //         <SortOrderIndicator tracker={ sortTracker.ratingAsc } />
  //       </Dropdown.Item>
  //       <Dropdown.Item eventKey="3" onClick={ releaseSort }>
  //         Released Year{ " " }
  //         <SortOrderIndicator tracker={ sortTracker.releaseAsc } />
  //       </Dropdown.Item>
  //       <Dropdown.Item eventKey="4" onClick={ popularSort }>
  //         Popularity{ " " }
  //         <SortOrderIndicator tracker={ sortTracker.popularAsc } />
  //       </Dropdown.Item>
  //     </DropdownButton>
  //   );
  // };

  return (
    <>
      {!isLoading ? (
        <div className={ classes.GotoPage }>
          <TopBar title={ title } />
          <div className={ classes.pageContent }>
            {/* <div className={ classes.options }>
              <div className={ classes.filter }>
                <h5 className={ classes.optionTitle }>FILTER</h5>
                <div className={ classes.dropdown }>
                  <FilterDropDown
                    btnName={ filterButtonName }
                    listValues={ filters }
                    filterSelectEvent={ filterSelectEvent }
                  />
                </div>
              </div>
              <div className={ classes.sort }>
                <h5 className={ classes.optionTitle }>SORT</h5>
                <div className={ classes.dropdown }>
                  <SortDropDown btnName="SORT BY" />
                </div>
              </div>
            </div> */}
            <MovieDisplay movies={ displayMoviesList } />
          </div>
        </div>
      ) : (
        <>
          <TopBar title="Loading..." />
          <Preloader />
        </>
      ) }
    </>
  );
};

export default GotoPage;