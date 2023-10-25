import React from "react";
import classes from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { useAuth } from '../../context/auth/authState'
import Notification from './../../services/NotificationService';

const NavBtn = ({ classname, to, text }) => {
  return (
    <div className={ classes.navlinks }>
      <Link className={ classname } to={ to }>
        { text }
      </Link>
    </div>
  )
}

const Navbar = () => {
  const { logout, token } = useAuth()

  const logoutHandler = () => {
    logout()
    Notification.show({
      message: 'Successfully logged out',
      status: true
    })
  }

  let authLinks = (
    <>
      <NavBtn classname={ classes.navbtnlink1 } to='/profile' text='Profile' />
      <button className={ classes.navbtnlink2 } onClick={ logoutHandler }>Logout</button>
    </>
  )

  let guestLinks = (
    <>
      <NavBtn classname={ classes.navbtnlink1 } to='/signup' text='Sign Up' />
      <NavBtn classname={ classes.navbtnlink2 } to='/signin' text='Sign In' />
    </>
  )

  return (
    <div className={ classes.navbarBg }>
      <div className={ classes.navcontainer }>
        <div className={ classes.logo }>
          <Link to={ "/" }>
            <div className={ classes.navlogo } />
          </Link>
        </div>
        <div className={ classes.navmenu }>
          <div className={ classes.navitem }>
            <div className={ classes.navbtn }>
              {
                token ? authLinks : guestLinks
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
