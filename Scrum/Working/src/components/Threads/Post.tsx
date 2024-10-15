import React, { useEffect, useState } from "react";
import PostByCard from "./PostedByCard";
import "./Post.css";
import CommentBox from "./CommentBox";
import CommentContainer from "./CommmentContainer";
import { getThreadComments } from "../../controller/ThreadController";

interface PostProps {
  idthread: string;
  usuario: string;
  descripcion: string;
  posttime: string;
  imagen: string; // base64 or URL4
  img_usuario: string;
}

const Post: React.FC<PostProps> = ({
  idthread,
  usuario,
  descripcion,
  posttime,
  imagen,
  img_usuario,
}) => {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = async () => {
    try {
      const fetchedComments = await getThreadComments(idthread);
      setComments(fetchedComments);
      setLoading(false);
      console.log(fetchedComments);
    } catch (err) {
      setError("Failed to fetch comments");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [idthread]); // Add idthread as a dependency

  const handleCommentSubmission = async () => {
    await fetchComments();
  };

  const isValidImage = (img: string) => {
    return img && (img.startsWith("data:image") || img.startsWith("http") || img.startsWith("https"));
  };
  console.log(usuario);
  console.log(img_usuario);

  return (
    <div className="post-card">
      <PostByCard
        usuario={usuario}
        posttime={posttime}
        img_usuario={img_usuario}
      />
      <div className="post-content">
        <p className="post-description">{descripcion}</p>
      </div>

      {isValidImage(imagen) && (
        <img className="post-image" src={imagen} alt="Post image" />
      )}

      <CommentBox
        usuario={usuario}
        idthread={idthread}
        onCommentSubmit={handleCommentSubmission}
      />

      {/* comments */}

      <div className="comments-container">
        {loading ? (
          <p>Loading comments...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          comments.map((comment) => (
            <CommentContainer
              usuario={comment.usuario}
              contenido={comment.contenido}
              mensaje_timestamp={comment.mensaje_timestamp}
              img_usuario={comment.img_usuario}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Post;
