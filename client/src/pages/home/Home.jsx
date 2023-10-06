import React from 'react'
import classes from "./Home.module.css";

import Searchbar from "../../components/searchbar/Searchbar";
import MovieRow from "../../components/movie-row/MovieRow";

import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

const Home = () => {

  return (
    <div className={classes.Home}>
        <Navbar />
        <div className={classes.imageBackground}></div>
        <div className={classes.searchbar}>
          <Searchbar />
        </div>
        <div>
            <MovieRow/> #Search Results Movies Row

            <MovieRow/> #Recommended Movies Row
            
            <MovieRow /> #Most Popular Movies Row
          
            <MovieRow /> #Latest Movies Row
          
            <MovieRow /> #Top Rated Movies Row
        
            <MovieRow /> #Genre Movies Row
        </div>
        <Footer />
      </div>
  )
}

export default Home