import { useState } from "react";
import { FaThumbsUp } from "react-icons/fa"; // Like icon
import "./BlogPost.css";

export default function BlogPost({ title, content, author, date }) {
  const [likes, setLikes] = useState(0);

  const handleLike = () => {
    setLikes((prev) => prev + 1);
  };

  return (
    <div className="post-card">
      <h2 className="post-title">{title}</h2>
      <p className="post-content">{content}</p>
     <p className="post-meta">
  <strong>Author:</strong> {author} <br />
  <strong>Date:</strong> {date}
</p>
      <div className="like-section">
        <button className="like-button" onClick={handleLike}>
          <FaThumbsUp className="like-icon" /> Like ({likes})
        </button>
      </div>
    </div>
  );
}

