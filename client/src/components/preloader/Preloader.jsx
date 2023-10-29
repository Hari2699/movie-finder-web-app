import React from "react";
import classes from "./Preloader.module.css";

const Preloader = () => {
  return (
    <div>
      <div className={classes.preloader} />

      <div className={classes.logo} />
    </div>
  );
};

export default Preloader;
