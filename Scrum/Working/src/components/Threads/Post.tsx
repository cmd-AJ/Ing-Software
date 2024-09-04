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
      <div className="post-content">
        <p className="post-description">{ descripcion}</p>
      </div>

      {imagen && <img className="post-image" src={imagen} alt="Post image" />}

      
    </div>
  );
};

export default Post;

