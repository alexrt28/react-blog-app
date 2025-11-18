import { useState, useEffect } from "react";
import "./CommentSection.css";
import { useAuth } from "../authWrapper/authContext.js";

export default function CommentSection({ postId }) {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch comments");
        return res.json();
      })
      .then(data => {
        setComments(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [postId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const newComment = {
      postId: Number(postId),
      name,
      body: comment,
      email: `${name.replace(" ", "").toLowerCase()}@example.com`,
    };

    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to post comment");
        return res.json();
      })
      .then(data => setComments([...comments, data]))
      .catch(err => alert(err.message));

    setName("");
    setComment("");
  };

  if (loading) return <p>Loading comments...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="comment-section">
      <h3>Comments</h3>
      {comments.length === 0 ? (
        <p>No comments yet. Be the first to comment!</p>
      ) : (
        <ul>
          {comments.map(c => (
            <li key={c.id}>
              <strong>{c.name}</strong>: {c.body}
            </li>
          ))}
        </ul>
      )}

            {user ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            placeholder="Write your comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button type="submit">Post Comment</button>
        </form>
      ) : (
        <p className="login-to-comment">
          Please log in to add a comment.
        </p>
      )}

    </div>
  );
}
