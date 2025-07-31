import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`/api/post/${id}`);
        if (!response.ok) {
          throw new Error('Failed to load post');
        }
        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id]);

  if (loading) {
    return React.createElement('div', { className: 'loading' }, 'Loading post...');
  }

  if (error) {
    return React.createElement(
      'div',
      { className: 'error' },
      React.createElement('p', null, 'Error: ', error),
      React.createElement(Link, { to: '/' }, '← Back to posts')
    );
  }

  if (!post) {
    return React.createElement('div', { className: 'not-found' }, 'Post not found');
  }

  return React.createElement(
    'article',
    { className: 'post' },
    React.createElement(
      'header',
      { className: 'post-header' },
      React.createElement('h1', { className: 'post-title' }, post.title),
      post.published_at &&
        React.createElement(
          'p',
          { className: 'post-date' },
          React.createElement('em', null, 'Published ', new Date(post.published_at).toLocaleString())
        )
    ),
    React.createElement(
      'div',
      { className: 'post-content' },
      React.createElement('p', { className: 'post-text' }, post.text)
    ),
    React.createElement(
      'footer',
      { className: 'post-footer' },
      React.createElement(
        Link,
        { to: '/', className: 'back-link' },
        '← Back to all posts'
      )
    )
  );
}

export default Post;
