const {
  countBy,
  maxBy,
  groupBy,
  transform,
  sumBy,
} = require('lodash');

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

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  const numBlogsPerAuthor = countBy(blogs, 'author');
  const authors = Object.keys(numBlogsPerAuthor);

  const authorWithMostBlogs = maxBy(authors, (auth) => numBlogsPerAuthor[auth]);

  return {
    author: authorWithMostBlogs,
    blogs: numBlogsPerAuthor[authorWithMostBlogs],
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;

  const blogsGroupedByAuthor = groupBy(blogs, 'author');

  const numLikesPerAuthor = transform(blogsGroupedByAuthor, (res, authBlogs, auth) => {
    const authLikes = sumBy(authBlogs, 'likes');
    res.push({
      author: auth,
      likes: authLikes,
    });
  }, []);

  return maxBy(numLikesPerAuthor, 'likes');
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
