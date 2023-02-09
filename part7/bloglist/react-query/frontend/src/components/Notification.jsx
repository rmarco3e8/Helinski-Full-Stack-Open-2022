import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const message = useSelector((state) => state.notification.message);
  const errorFlag = useSelector((state) => state.notification.errorFlag);

  if (message === null) {
    return null;
  }
  const className = errorFlag ? 'error' : 'success';

  return <div className={className}>{message}</div>;
};

export default Notification;
