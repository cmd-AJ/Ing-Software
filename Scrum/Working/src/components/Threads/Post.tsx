import React from 'react';
import PostByCard from './PostedByCard';
import './Post.css';
import CommentBox from './CommentBox';

interface PostProps {
  idthread: string;
  usuario: string;
  descripcion: string;
  posttime: string;
  imagen: string; // base64 or URL4
  img_usuario: string;
}

const Post: React.FC<PostProps> = ({ idthread, usuario, descripcion, posttime, imagen, img_usuario }) => {

  const isValidImage = (img: string) => {
    return img && (img.startsWith('data:image') || img.startsWith('http'));
  };

  return (
    <div className="post-card">
      <PostByCard usuario={usuario} posttime={posttime} img_usuario={img_usuario}/>
      <div className="post-content">
        <p className="post-description">{ descripcion}</p>
      </div>

      {isValidImage(imagen) && <img className="post-image" src={imagen} alt="Post image" />}
      <CommentBox usuario={usuario} />
      
    </div>
  );
};

export default Post;

