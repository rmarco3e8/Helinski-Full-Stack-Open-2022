import React from 'react';
import { useNotificationValue } from '../contexts/notificationContext';

const Notification = () => {
  const { message, errorFlag } = useNotificationValue();

  if (message === null) {
    return null;
  }
  const className = errorFlag ? 'error' : 'success';

  return <div className={className}>{message}</div>;
};

export default Notification;
