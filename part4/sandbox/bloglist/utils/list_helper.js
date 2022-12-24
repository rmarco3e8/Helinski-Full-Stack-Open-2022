/* eslint-disable no-unused-vars */
const dummy = (blogs) => 1;
/* eslint-enable no-unused-vars */

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0);

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;

  const hasMostLikes = blogs.reduce((favorite, blog) => (
    favorite.likes > blog.likes
      ? favorite
      : blog
  ), blogs[0]);

  const { id, url, ...rest } = hasMostLikes;
  return rest;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
