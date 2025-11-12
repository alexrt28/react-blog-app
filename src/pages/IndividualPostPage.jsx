import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CommentSection from "../components/CommentSection/CommentSection";
import "./IndividualPostPage.css";


export default function IndividualPostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);   //  loading state
  const [error, setError] = useState(null);       //  error state

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch post");
        return res.json();
      })
      .then(data => {
        setPost(data);
        return fetch(`https://jsonplaceholder.typicode.com/users/${data.userId}`);
      })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch user");
        return res.json();
      })
      .then(userData => {
        setUser(userData);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading post...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="individual-post">
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      {user && (
        <p><strong>Author:</strong> {user.name} ({user.email})</p>
      )}
      <CommentSection postId={id} />
    </div>
  );
}
