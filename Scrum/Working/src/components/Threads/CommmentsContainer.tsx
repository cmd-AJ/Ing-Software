import React, { useEffect, useState } from "react";
import "./CommentsContainer.css";
import { getThreadComments } from "../../controller/ThreadController";

interface UserProps {
  idthread: string;
}

const CommentsContainer: React.FC<UserProps> = ({ idthread }) => {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = async () => {
    try {
      const fetchedComments = await getThreadComments(idthread);
      setComments(fetchedComments); // Save the fetched posts in state
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

  const handlePostSubmission = async () => {
    await getThreadComments(idthread);
};
  

  return (
    <div className="comments-container">
      <div className="comments-scroller">
        {loading ? (
          <p>Loading comments...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="comment">
              <strong>{comment.usuario}</strong>: {comment.conteni}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentsContainer;
