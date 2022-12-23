const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

/* eslint-disable no-param-reassign, no-underscore-dangle */
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
/* eslint-disable no-param-reassign, no-underscore-dangle */

module.exports = mongoose.model('Blog', blogSchema);
