import React from 'react';

const Notification = ({ message, errorFlag }) => {
  if (message === null) {
    return null;
  }
  const className = (errorFlag)
    ? 'error'
    : 'success';

  return (
    <div className={className}>
      { message }
    </div>
  );
};

export default Notification;
