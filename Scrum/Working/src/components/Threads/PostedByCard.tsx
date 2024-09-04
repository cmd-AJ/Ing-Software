import React from 'react';
import './PostedByCards.css';

interface PostByCardProps {
  usuario: string;
  posttime: string;
}

const PostByCard: React.FC<PostByCardProps> = ({ usuario, posttime }) => {
  return (
    <div className="postedby-card">
      <div className="post-user-profile"></div>
      <div className='user-info-container'>
        <h4 className="postedby-usuario">{usuario}</h4>
        <h6 className="postedby-time">{new Date(posttime).toLocaleString()}</h6>
      </div>
    </div>
  );
};

export default PostByCard;
