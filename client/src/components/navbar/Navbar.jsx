import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import classes from "./Navbar.module.css";
import Notification from './../../services/NotificationService';

const NavBtn = ({ classname, to, text }) => {
  return (
    <div className={classes.navlinks}>
      <Link className={classname} to={to}>
        {text}
      </Link>
    </div>
  )
}

const Navbar = () => {
  const history = useHistory();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Check for JWT token and user data in local storage
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      setIsSignedIn(true);
      setUsername(user.username);
    }
  }, []);

  const logoutHandler = () => {
    // Clear the JWT token and user data from local storage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setIsSignedIn(false);
    setUsername('');
    Notification.show({
      message: 'Successfully logged out',
      status: true
    });
    // Redirect to home page or login page
    history.push('/signin');
  };

  return (
    <div className={classes.navbarBg}>
      <div className={classes.navcontainer}>
        <div className={classes.logo}>
          <Link to={"/"}>
            {/* Assuming you have a logo to display */}
            <div className={classes.navlogo} />
          </Link>
        </div>
        <div className={classes.navmenu}>
          <div className={classes.navitem}>
            <div className={classes.navbtn}>
              {isSignedIn ? (
                <>
                  <NavBtn classname={classes.navbtnlink1} to='/profile' text={`Hi, ${username}`} />
                  <button className={classes.navbtnlink2} onClick={logoutHandler}>Logout</button>
                </>
              ) : (
                <>
                  <NavBtn classname={classes.navbtnlink1} to='/signup' text='Sign Up' />
                  <NavBtn classname={classes.navbtnlink2} to='/signin' text='Sign In' />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;