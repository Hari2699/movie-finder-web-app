import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AlertNotification from "../components/alert-notification/AlertNotification";
import Fade from "../components/alert-notification/Fade";

/**
 * 
 * @returns Notification 
 * @description Handles All Notification actions
 */
const Notification = () => {
  let [queue, setQueue] = useState({});

  useEffect(() => {
    const addNotification = e => {
      let uid = uuidv4();
      setQueue({
        ...queue,
        [uid]: {
          message: e.detail.message,
          type: e.detail.type,
          isVisible: true,
          id: uid,
          status: e.detail.status
        }
      });
    };

    const removeNotification = e => {
      let newQueue = { ...queue };
      delete newQueue[e.detail.id];
      setQueue(newQueue);
    };
    document.addEventListener("notify", addNotification);
    document.addEventListener("remove-notify", removeNotification);

    return () => {
      document.removeEventListener("notify", addNotification);
      document.removeEventListener("remove-notify", removeNotification);
    };
  }, [queue]);

  const hideNotification = (id) => {
    setQueue({
      ...queue,
      [id]: {
        ...queue[id],
        isVisible: false
      }
    });
  };

  return (
    <section className="notification-container" style={ { zIndex: '500' } }>
      {Object.values(queue).map(({ id, message, isVisible, type, status }) => (
        <Fade show={ isVisible } key={ id }>
          <AlertNotification
            type={ type }
            id={ id }
            message={ message }
            handleClose={ hideNotification }
            status={ status }
          />
        </Fade>
      )) }
    </section>
  );
};

Notification.show = ({ message, status }) => {

  document.dispatchEvent(
    new CustomEvent("notify", {
      detail: {
        message,
        status: status,
      }
    })
  );
};

export default Notification;