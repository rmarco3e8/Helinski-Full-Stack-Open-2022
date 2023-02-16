import React from 'react';
import { useSelector } from 'react-redux';
import { Alert } from '@mui/material';

const Notification = () => {
  const message = useSelector((state) => state.notification.message);
  const errorFlag = useSelector((state) => state.notification.errorFlag);

  if (message === null) {
    return null;
  }
  const messageSeverity = errorFlag ? 'error' : 'success';

  return <Alert severity={messageSeverity}>{message}</Alert>;
};

export default Notification;
