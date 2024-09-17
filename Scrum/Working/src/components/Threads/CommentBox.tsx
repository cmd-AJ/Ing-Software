import React from "react";
import './CommentBox.css'

interface UserProps {
  usuario: string;
  }
  

const CommentBox: React.FC<UserProps>= ({ usuario }) => {
    return (
      <div className="comment-box">
    
      </div>
    );
  };
  
export default CommentBox;
  