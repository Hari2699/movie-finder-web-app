import React from "react";
import classes from "./Footer.module.css";

const Footer = () => {
  const navTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  return (
    <div className={classes.containerFooter}>
      <div className={classes.itemsFooter}>
        <h3 className={classes.headFooter}>
          <span style={{ color: "#0dc971d8" }}>MOVIE</span>
          <span>FINDER</span>
        </h3>
      </div>
      <div className={classes.socialFooter}>
        <a href="https://www.facebook.com" ><i className="fa fa-facebook"></i></a>
        <a href="https://www.youtube.com" ><i className="fa fa-youtube"></i></a>
        <a href="https://www.twitter.com" ><i className="fa fa-twitter"></i></a>
        <a href="https://www.instagram.com" ><i className="fa fa-instagram"></i></a>
      </div>
      <div className={classes.contentFooter}>
        ©Copyright 2023. All rights reserved.
      </div>

      <div className={classes.scrollUp} onClick={navTop}>
        <i className="fa fa-arrow-up"></i>
      </div>
    </div>
  );
};

export default Footer;