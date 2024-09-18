import React from 'react';
import PostByCard from './PostedByCard';
import './Post.css';
import CommentBox from './CommentBox';

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
      <CommentBox usuario={usuario} />
      
    </div>
  );
};

export default Post;

