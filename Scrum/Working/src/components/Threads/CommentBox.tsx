import React, { useState } from "react";
import { IonIcon } from "@ionic/react";
import { send } from "ionicons/icons";
import './CommentBox.css';
import { insertCommentToThread } from "../../controller/ThreadController";

interface UserProps {
  usuario: string;
  idthread: string;
  onCommentSubmit: () => void;
}

const CommentBox: React.FC<UserProps> = ({ usuario , idthread, onCommentSubmit}) => {
  const [comment, setComment] = useState<string>("");

  const handlePost = async () => {
    if (comment.trim() === "") {
      alert("Por favor, ingresa un comentario.");
      return;
    }

    console.log(`Comentario de ${usuario}: ${comment}`);
    onCommentSubmit();
    await insertCommentToThread(idthread, comment, localStorage.getItem('dpi') || '');
    setComment(""); // Clear the input after posting
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handlePost();
    }
  };

  return (
    <div className="comment-box">
      <div className="comment-user-profile"></div>
      <div className="comment-input">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Escribe un comentario..."
          maxLength={200} // Limit the input to 200 characters
          rows={1} // Start with a single row
        />
        <button onClick={handlePost} className="send-button">
          <IonIcon icon={send} />
        </button>
      </div>
    </div>
  );
};

export default CommentBox;
