const { favoriteBlog } = require('../utils/list_helper');

describe('favorite blog', () => {
  const listOfOneBlog = [
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      id: '63a646552934b6bfeeec55cf',
    },
  ];

  const listOfMultipleBlogs = [
    {
      title: 'Pros and Cons Of Working Out In Hoodie',
      author: 'gymammo',
      url: 'https://www.gymammo.com/blogs/gymammo-magazine/pros-and-cons-of-working-out-in-hoodie',
      likes: 22,
      id: '63a6178ba3ce48d24f4df0e6',
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      id: '63a646552934b6bfeeec55cf',
    },
    {
      title: 'ermmmmm please read me...',
      author: 'what the haiiiilllll',
      url: 'http://www.ohhhhmygaawwedd.html',
      likes: 42,
      id: '63a646a72934b6bfeeec55d1',
    },
    {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      id: '5a422b3a1b54a676234d17f9',
    },
    {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
      likes: 10,
      id: '5a422b891b54a676234d17fa',
    },
    {
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 0,
      id: '5a422ba71b54a676234d17fb',
    },
    {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
      id: '5a422bc61b54a676234d17fc',
    },
  ];

  test('of an empty list is null', () => {
    expect(favoriteBlog([])).toBe(null);
  });

  test('when a list has only one blog is that', () => {
    const sanitizedFavorite = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    };
    expect(favoriteBlog(listOfOneBlog)).toEqual(sanitizedFavorite);
  });

  test('of a bigger list is the one with most likes', () => {
    const sanitizedFavorite = {
      title: 'ermmmmm please read me...',
      author: 'what the haiiiilllll',
      likes: 42,
    };
    expect(favoriteBlog(listOfMultipleBlogs)).toEqual(sanitizedFavorite);
  });
});
