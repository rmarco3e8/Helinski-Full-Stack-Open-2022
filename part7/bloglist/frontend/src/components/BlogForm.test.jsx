import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

describe('<BlogForm />', () => {
  let container;
  let mockCreateBlog;

  beforeEach(() => {
    mockCreateBlog = jest.fn();

    container = render(<BlogForm createBlog={mockCreateBlog} />).container;
  });

  test('calls createBlog with right details when new blog is created', async () => {
    const user = userEvent.setup();

    const titleInput = container.querySelector('#title-input');
    await user.type(titleInput, 'lame blog');

    const authorInput = container.querySelector('#author-input');
    await user.type(authorInput, 'johnny twoshoes');

    const urlInput = container.querySelector('#url-input');
    await user.type(urlInput, 'www.visitme.com');

    const createButton = screen.getByText('create');
    await user.click(createButton);

    expect(mockCreateBlog.mock.calls).toHaveLength(1);
    expect(mockCreateBlog.mock.calls[0][0].title).toBe('lame blog');
    expect(mockCreateBlog.mock.calls[0][0].author).toBe('johnny twoshoes');
    expect(mockCreateBlog.mock.calls[0][0].url).toBe('www.visitme.com');
  });
});
