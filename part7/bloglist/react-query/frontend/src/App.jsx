import { React, useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import blogService from './services/blogs';
import Blog from './components/Blog';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import './index.css';
import { useSendNotification } from './contexts/notificationContext';
import {
  useInitializeUser,
  useLogOutUser,
  useLoginValue,
} from './contexts/loginContext';

const App = () => {
  const queryClient = useQueryClient();

  const sendNotification = useSendNotification();
  const initializeUser = useInitializeUser();
  const logOutUser = useLogOutUser();

  // Blog Mutations

  const createBlogMutation = useMutation(blogService.create, {
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData('blogs');
      queryClient.setQueryData('blogs', blogs.concat(newBlog));

      const message = `a new blog: ${newBlog.title} by: ${newBlog.author} added`;
      sendNotification(message, false, 5);
    },
    onError: (object) => {
      const message = object.response.data.error;
      sendNotification(message, true, 5);
    },
  });

  const updateBlogMutation = useMutation(
    ([id, newBlog]) => blogService.update(id, newBlog),
    {
      onSuccess: (updatedBlog) => {
        const blogs = queryClient.getQueryData('blogs');
        queryClient.setQueryData(
          'blogs',
          blogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b))
        );
      },
    }
  );

  const removeBlogMutation = useMutation(blogService.remove, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs');
    },
    onError: (object) => {
      const message = object.response.data.error;
      sendNotification(message, true, 5);
    },
  });

  useEffect(() => {
    initializeUser();
  }, []);

  const blogFormRef = useRef();

  const user = useLoginValue();

  const result = useQuery('blogs', blogService.getAll, {
    refetchOnWindowFocus: false,
    retry: 1,
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return <div>blog service not available due to problems in server</div>;
  }

  const blogs = result.data;

  const handleLogout = (event) => {
    event.preventDefault();
    logOutUser();
  };

  const addBlog = async (blogToAdd) => {
    blogFormRef.current.toggleVisibility();
    createBlogMutation.mutate(blogToAdd);
  };

  const sortedBlogs = structuredClone(blogs).sort(
    (blog1, blog2) => blog2.likes - blog1.likes
  );

  return (
    <>
      <h2>blogs</h2>
      <Notification />
      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <p>
            {`${user.name} logged in`}
            &nbsp;
            <button type="button" onClick={handleLogout}>
              logout
            </button>
          </p>
          <h2>create new</h2>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>

          <br />
          {sortedBlogs.map((b) => (
            <Blog
              key={b.id}
              blog={b}
              loggedUser={user.username}
              updateBlogMutation={updateBlogMutation}
              removeBlogMutation={removeBlogMutation}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default App;
