import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ message, errorFlag }) => {
  if (message === null) {
    return null;
  }
  const className = errorFlag ? 'error' : 'success';

  return <div className={className}>{message}</div>;
};

Notification.propTypes = {
  message: PropTypes.string,
};

Notification.defaultProps = {
  message: null,
};

export default Notification;
