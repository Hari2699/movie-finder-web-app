import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import "./App.css";

import Home from "./pages/home/Home";
import SignUp from './pages/signup/SignUp';
import SignIn from './pages/signin/SignIn';
import GotoPage from './pages/gotoPage/GoToPage';
import MoviePage from './pages/movies-page/MoviesPage';
import Notification from './services/NotificationService';
import AuthProvider from './context/auth/authState';
import MovieProvider from './context/movies/movieState';
import GuestRoute from './routes/GuestRoute';

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  
  return (
    <Router>
      <Notification />
      <AuthProvider>
        <MovieProvider>
          <Switch>
            <Route exact path="/" component={Home} />
            <GuestRoute path="/signin" component={SignIn} />
            <GuestRoute path="/signup" component={ SignUp } />
            <Route path="/movie/:id" component={MoviePage} />
            <Route path="/mostpopular" component={ GotoPage } />
            <Route path="/latestmovies" component={ GotoPage } />
            <Route path="/toprated" component={ GotoPage } />
            <Redirect to="/"></Redirect>
          </Switch>
        </MovieProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
