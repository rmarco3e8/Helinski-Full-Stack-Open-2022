import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('<Blog />', () => {
  let container;
  let mockReplaceBlog;

  beforeEach(() => {
    const blog = {
      title: 'Really cool blog!',
      author: 'Ralph Beanstalk',
      url: 'www.fakeweb.com',
      likes: 3,
      user: {
        id: '63b313d747552a35cc6772c7',
        name: 'Billy',
        username: 'BillyCornholio',
      },
    };
    mockReplaceBlog = jest.fn();
    const mockDeleteBlog = jest.fn();
    const mockUsername = 'BillyCornholio';

    container = render(
      <Blog
        blog={blog}
        updateBlog={mockReplaceBlog}
        removeBlog={mockDeleteBlog}
        loggedUser={mockUsername}
      />
    ).container;
  });

  test('at start displays title and author, but not URL or likes', async () => {
    const visibleDiv = container.querySelector('.blogAlwaysVisible');
    expect(visibleDiv).not.toHaveStyle('display: none');
    screen.getByText('Ralph Beanstalk', { exact: false });
    screen.getByText('Really cool blog!', { exact: false });

    const togglableDiv = container.querySelector('.blogTogglableContent');
    expect(togglableDiv).toHaveStyle('display: none');

    let element = screen.getByText('www.fakeweb.com', { exact: false });
    expect(element).not.toBeVisible();

    element = screen.getByText('likes 3', { exact: false });
    expect(element).not.toBeVisible();
  });

  test('displays URL and likes after show button is clicked', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('view');
    await user.click(button);

    const togglableDiv = container.querySelector('.blogTogglableContent');
    expect(togglableDiv).not.toHaveStyle('display: none');

    let element = screen.getByText('www.fakeweb.com', { exact: false });
    expect(element).toBeVisible();

    element = screen.getByText('likes 3', { exact: false });
    expect(element).toBeVisible();
  });

  test('calls like handler twice when button is clicked twice', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('view');
    await user.click(button);

    const likeButton = container.querySelector('.likeButton');
    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockReplaceBlog.mock.calls).toHaveLength(2);
  });
});
