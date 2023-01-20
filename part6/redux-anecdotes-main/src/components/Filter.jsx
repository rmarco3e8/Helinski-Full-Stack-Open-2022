import React from 'react';
import { connect } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';

/* eslint-disable react/destructuring-assignment */
const Filter = (props) => {
  const handleChange = (event) => {
    event.preventDefault();
    const filter = event.target.value;
    props.setFilter(filter);
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};
/* eslint-enable react/destructuring-assignment */

export default connect(
  null,
  { setFilter },
)(Filter);
