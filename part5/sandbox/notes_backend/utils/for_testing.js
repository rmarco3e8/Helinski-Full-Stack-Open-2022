/* eslint-disable arrow-body-style */
const reverse = (string) => {
  return string
    .split('')
    .reverse()
    .join('');
};

const average = (array) => {
  if (array.length === 0) return 0;

  const reducer = (sum, item) => {
    return sum + item;
  };

  return array.reduce(reducer, 0) / array.length;
};
/* eslint-enable arrow-body-style */

module.exports = {
  reverse,
  average,
};
