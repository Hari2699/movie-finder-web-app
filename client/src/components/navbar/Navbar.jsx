import React, { useState, useEffect } from "react";
import classes from "./Navbar.module.css";
import { Link } from "react-router-dom";
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
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      setIsSignedIn(true);
      setUsername(user.username);
    }
  }, []);

  const logoutHandler = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/accounts/logout/', {
        method: 'POST',
      });

      if (response.ok) {
        localStorage.removeItem('userData');
        setIsSignedIn(false);
        setUsername('');
        Notification.show({
          message: 'Successfully logged out',
          status: true
        });
      }
    } catch (error) {
      Notification.show({
        message: "An error occurred during logout",
        status: false,
      });
    }
  };

  return (
    <div className={classes.navbarBg}>
      <div className={classes.navcontainer}>
        <div className={classes.logo}>
          <Link to={"/"}>
            <div className={classes.navlogo} />
          </Link>
        </div>
        <div className={classes.navmenu}>
          <div className={classes.navitem}>
            <div className={classes.navbtn}>
              {isSignedIn ? (
                <>
                  <button className={classes.navbtnlink1}>Hello, {username}</button>
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
