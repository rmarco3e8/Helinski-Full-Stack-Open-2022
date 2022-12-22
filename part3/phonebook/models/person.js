const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

console.log('connecting to', url);

mongoose.connect(url)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting:', err.message));

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: (num) => /^\d{2,3}-\d{2,3}-\d{4,7}$/.test(num),
      message: (props) => `${props.value} is not a valid phone number`,
    },
    required: true,
  },
});
/* eslint-disable no-param-reassign, no-underscore-dangle */
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
/* eslint-enable no-param-reassign, no-underscore-dangle */

module.exports = mongoose.model('Person', personSchema);
