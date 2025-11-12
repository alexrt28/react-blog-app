import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./BlogPostsPage.css";

export default function BlogPostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);   // loading state
  const [error, setError] = useState(null);       // error state

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch posts");
        return res.json();
      })
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center">Loading posts...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="posts-page">
      <h1>Blog Posts</h1>
      {posts.map((post) => (
        <div key={post.id} className="post">
          <h2>{post.title}</h2>
          <p>{post.body.slice(0, 100)}...</p>
          <Link to={`/post/${post.id}`}>Read More</Link>
        </div>
      ))}
    </div>
  );
}
