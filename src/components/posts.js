import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/posts');
        if (!response.ok) {
          throw new Error('Failed to load posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) {
    return React.createElement('div', { className: 'loading' }, 'Loading posts...');
  }

  if (error) {
    return React.createElement(
      'div',
      { className: 'error' },
      React.createElement('p', null, 'Error: ', error),
      React.createElement(
        'button',
        { onClick: () => window.location.reload() },
        'Try again'
      )
    );
  }

  return React.createElement(
    'div',
    { className: 'posts-container' },
    React.createElement(
      'header',
      { className: 'posts-header' },
      React.createElement('h1', null, 'Blog Posts')
    ),
    React.createElement(
      'div',
      { className: 'posts-list' },
      posts.length > 0
        ? posts.map((post) =>
            React.createElement(
              'article',
              { key: post.id, className: 'post-preview' },
              React.createElement(
                'h2',
                { className: 'post-title' },
                React.createElement(
                  Link,
                  { to: `/posts/${post.id}` },
                  post.title
                )
              ),
              post.published_at &&
                React.createElement(
                  'p',
                  { className: 'post-date' },
                  new Date(post.published_at).toLocaleDateString()
                )
            )
          )
        : React.createElement('p', null, 'No posts found.')
    )
  );
}

export default Posts;
