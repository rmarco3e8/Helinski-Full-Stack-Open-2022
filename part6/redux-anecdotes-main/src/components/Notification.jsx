import React from 'react';
import { connect } from 'react-redux';

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };
  return (
    <div style={style}>
      {message}
    </div>
  );
};

export default connect(
  (state) => ({ message: state.message }),
  null,
)(Notification);
