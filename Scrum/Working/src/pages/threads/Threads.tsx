import React, { useEffect, useState } from 'react';
import { IonPage } from '@ionic/react';
import './Threads.css'
import PostField from '../../components/Threads/PostField';
import { dummyPosts } from './dummyPosts';
import Post from '../../components/Threads/Post';
import { getThreadPosts } from '../../controller/ThreadController';

const Threads: React.FC = () => {

    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const fetchedPosts = await getThreadPosts();
                setPosts(fetchedPosts);  // Save the fetched posts in state
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch posts');
                setLoading(false);
            }
        };

        fetchPosts();  // Call the function to fetch posts when component mounts
    }, []);

    return (
        <IonPage>
            <div className='threads-space'>
                <div className="threads-container">
                    <div className='thread-scroller'>
                        <PostField />
                        
                        {loading ? (
                            <p>Loading posts...</p>
                        ) : error ? (
                            <p>{error}</p>
                        ) : (
                            posts.map(post => (
                                <Post
                                    key={post.idthreads}
                                    idthread={post.idthreads}
                                    usuario={post.usuario}
                                    descripcion={post.descripcion}
                                    posttime={post.posttime}
                                    imagen={post.imagen}
                                    img_usuario={post.img_usuario}
                                />
                            ))
                        )}
                    </div>
                    

                </div>
            </div>
        </IonPage>
    )
}

export default Threads;