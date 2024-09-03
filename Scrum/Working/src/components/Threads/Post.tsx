import React from 'react';
import PostByCard from './PostedByCard';
import './Post.css';

interface PostProps {
  idthread: string;
  usuario: string;
  descripcion: string;
  posttime: string;
  imagen: string; // base64 or URL
}

const Post: React.FC<PostProps> = ({ idthread, usuario, descripcion, posttime, imagen }) => {
  return (
    <div className="post-card">
      <PostByCard usuario={usuario} posttime={posttime} />
      <div className="post-header">
        <h4 className="post-subtitle">{usuario}</h4>
        <h2 className="post-title">{`Thread ID: ${idthread}`}</h2>
        <p className="post-time">{new Date(posttime).toLocaleString()}</p>
      </div>

      {imagen && <img className="post-image" src={imagen} alt="Post image" />}

      <div className="post-content">
        <p className="post-description">{ }</p>
      </div>
    </div>
  );
};

export default Post;

