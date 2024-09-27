import React from 'react';
import './CommentContainer.css';

interface CommentContainerProps {
  usuario: string;
  contenido: string;
  mensaje_timestamp: string;
  img_usuario: string;
}

const CommentContainer: React.FC<CommentContainerProps> = ({ usuario, contenido, mensaje_timestamp, img_usuario }) => {
  return (
    <div className="comment-card">
      <div className="comment-header">
        <img
          src={img_usuario}
          alt={`${usuario}'s profile`}
          className="comment-image"
        />
        <div className="comment-user-details">
          <strong className="comment-username">{usuario}</strong>
          <span className="comment-timestamp">{new Date(mensaje_timestamp).toLocaleString()}</span>
        </div>
      </div>
      <div className="comment-content">
        {contenido}
      </div>
    </div>
  );
};

export default CommentContainer;
