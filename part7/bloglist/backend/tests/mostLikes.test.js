const { mostLikes } = require('../utils/list_helper');

describe('author with most likes', () => {
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
      author: 'gymammo rex',
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
    },
    {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
      likes: 10,
    },
    {
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 0,
    },
    {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
    },
  ];
  const listOfMultipleBlogsWithTie = [
    {
      title: 'Pros and Cons Of Working Out In Hoodie',
      author: 'gymammo rex',
      url: 'https://www.gymammo.com/blogs/gymammo-magazine/pros-and-cons-of-working-out-in-hoodie',
      likes: 2,
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
      likes: 11,
      id: '63a646a72934b6bfeeec55d1',
    },
    {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
    },
    {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
      likes: 10,
    },
    {
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 5,
    },
    {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
    },
  ];

  test('of an empty list is null', () => {
    expect(mostLikes([])).toBe(null);
  });

  test('when a list has only one blog equals the author of that blog', () => {
    const authorWithMostLikes = {
      author: 'Edsger W. Dijkstra',
      likes: 5,
    };
    expect(mostLikes(listOfOneBlog)).toEqual(authorWithMostLikes);
  });

  test('of a bigger list is calculated right', () => {
    const authorWithMostLikes = {
      author: 'what the haiiiilllll',
      likes: 42,
    };
    expect(mostLikes(listOfMultipleBlogs)).toEqual(authorWithMostLikes);
  });

  test('of a bigger list with a tie is either author', () => {
    const authorsWithMostLikes = [
      {
        author: 'Edsger W. Dijkstra',
        likes: 17,
      },
      {
        author: 'Robert C. Martin',
        likes: 17,
      },
    ];
    expect(authorsWithMostLikes).toContainEqual(
      mostLikes(listOfMultipleBlogsWithTie)
    );
  });
});
