import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "./App.css";

import Home from "./pages/home/Home";
import SignUp from './pages/signup/SignUp';
import SignIn from './pages/signin/SignIn';

function App() {
  
  return (
    <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
          </Switch>
    </Router>
  );
}

export default App;