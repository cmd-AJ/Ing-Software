import React, { useEffect, useState } from "react";
import { IonPage } from "@ionic/react";
import "./Threads.css";
import PostField from "../../components/Threads/PostField";
import Post from "../../components/Threads/Post";
import { getThreadPosts } from "../../controller/ThreadController";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import AdsenseInFeedAd from "../../ADS/In-feedthread";

const Threads: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const fetchedPosts = await getThreadPosts();

      setTimeout(() => {
        setPosts(fetchedPosts);
        setLoading(false);
      }, 500); // Delay 1s (1000ms)
    } catch (err) {
      setError("Failed to fetch posts");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostSubmission = async () => {
    await fetchPosts(); // Re-fetch posts after a new post is submitted
  };

  return (
    <IonPage>

      <div className="threads-space">
        <div className="threads-container">
          <div className="thread-scroller">
            <PostField onPostSubmit={handlePostSubmission} img_usuario={""} />

            {loading ? (
              <div>
                {[...Array(5)].map((_, index) => (
                  <Skeleton
                    key={index}
                    height={150}
                    width={`97%`}
                    className="custom-skeleton"
                  />
                ))}
              </div>
            ) : error ? (
              <p>{error}</p>
            ) : (
              posts.map((post, index) => (
                <React.Fragment key={post.idthreads}>
                  <Post
                    idthread={post.idthreads}
                    usuario={post.usuario}
                    descripcion={post.descripcion}
                    posttime={post.posttime}
                    imagen={post.imagen}
                    img_usuario={post.img_usuario}
                    dpi={post.dpi}
                  />
              
                  {/* Insert an ad every 3 posts with a unique key */}
                  {(index + 1) % 3 === 0 && <AdsenseInFeedAd key={`ad-${post.idthreads}`} />}
                </React.Fragment>
              ))
            )}
          </div>
        </div>
      </div>
    </IonPage>
  );
};

export default Threads;
