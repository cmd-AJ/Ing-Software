import React, { useState } from "react";
import './CommentBox.css';

interface UserProps {
  usuario: string;
}

const CommentBox: React.FC<UserProps> = ({ usuario }) => {
  const [comment, setComment] = useState<string>("");

  const handlePost = () => {
    if (comment.trim() === "") {
      alert("Por favor, ingresa un comentario.");
      return;
    }

    console.log(`Comentario de ${usuario}: ${comment}`);
    setComment("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handlePost();
    }
  };

  return (
    <div className="comment-box">
      <div className="comment-user-profile">
      </div>
      <div className="comment-input">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Escribe un comentario..."
        />
        <button onClick={handlePost}>Publicar</button>
      </div>
    </div>
  );
};

export default CommentBox;
