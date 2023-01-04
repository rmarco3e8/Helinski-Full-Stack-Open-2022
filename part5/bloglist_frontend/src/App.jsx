import { React, useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogService.getAll().then((b) => setBlogs(b));
  }, []);

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map((b) => <Blog key={b.id} blog={b} />)}
    </div>
  );
};

export default App;
