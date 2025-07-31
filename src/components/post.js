import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const Post = () => {
  const [post, setPost] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const getPost = async () => {
      const resp = await fetch(`/api/post/${id}`);
      const postResp = await resp.json();
      setPost(postResp);
    };

    getPost();
  }, [id]);

  if (!Object.keys(post).length) return <div>Loading...</div>;

  return (
    <div className="post-container">
      <h1 className="post-title">{post.title}</h1>
      <p className="post-text">{post.text}</p>
      <p className="post-date">
        <em>Published {new Date(post.published_at).toLocaleString()}</em>
      </p>
      <p className="back-link">
        <Link to="/">← Go back to posts</Link>
      </p>
    </div>
  );
};

export default Post;
