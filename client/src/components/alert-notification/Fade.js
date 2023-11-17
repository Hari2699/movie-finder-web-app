import React, { useState, useEffect } from "react";

import "./AlertNotification.css"

const Fade = ({ show, children, onUnmount }) => {
  const [shouldRender, setRender] = useState(show);

  useEffect(() => {
    show && setRender(show);
  }, [show]);

  const animationEnd = () => {
    if (!show) setRender(false);
    onUnmount && onUnmount();
  };

  return (
    shouldRender && (

      <div className={`${show ? "fadeIn" : "fadeOutSlide"}`} style={{zIndex:'100'}} show={show} onAnimationEnd={animationEnd}>
        {children}
      </div>
    )
  );
};

export default Fade;
