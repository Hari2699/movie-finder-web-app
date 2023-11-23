import React, { useLayoutEffect, useState } from "react";
import "./AlertNotification.css";

/**
 * 
 * @param {*} id  
 * @param {*} message
 * @param {*} status
 * @param {*} handleClose 
 * @returns Alert Box
 */

const AlertNotification = ({ id, message, status, handleClose }) => {
  const [icon] = useState(status === true ? "fa fa-check-circle" : "fa fa-exclamation")
  const [title] = useState(status === false ? "Error" : "Success")
  useLayoutEffect(() => {
    const closeMe = () => {
      handleClose(id);
    };
    let timer = window.setTimeout(closeMe, 2000);
    return () => window.clearTimeout(timer);
  }, [id, handleClose]);

  return (
    <div style={ { backgroundColor: status === true ? "#38945E" : "#ff0000b0" } } className={ `alert-box d-flex p-2 text-white px-4 justify-content-between align-items-center gap-1 gap-4` }>
      <div className="d-flex justify-content-center pr-4 align-items-center">
        <i style={ { fontSize: "30px" } } className={ icon }></i>
      </div>
      <div className="">
        <h5>{ title }</h5>
        <span> { message } </span>
      </div>
      <div className="d-flex align-items-center p-3 justify-content-center ">
        <i style={ { fontSize: "30px" } } className="fa fa-times-circle" aria-hidden="true" onClick={ () => handleClose(id) }></i>
      </div>
    </div>
  );
};

export default AlertNotification;