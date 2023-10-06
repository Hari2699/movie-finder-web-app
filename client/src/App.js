import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "./App.css";
import axios from 'axios';
import { MovieCard } from "./components/MovieCard/MovieCard";

import Home from "./pages/home/Home";

function App() {
  
  const [movies, setMovies] = useState([]);

    const getmovie = async () =>{
         try{
            const {data} = await axios.get("https://api.themoviedb.org/3/discover/movie?api_key=7af1cba5c48ce69c437e486757fef8f7")
            setMovies(data.results);
         }catch(err){
            console.log(movies);
         }
       }
       useEffect(()=>{
        getmovie()
       },[])

  return (
    <div className='App'>  
      <Router>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
      </Router>

      <main className='main'>
        {
          movies && movies.length > 0 && movies.map(movie => <MovieCard key ={movie.id} movie={movie}/>)
        }
      </main>
    </div>
  );
}

export default App;
