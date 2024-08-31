import React from 'react';
import { IonPage } from '@ionic/react';
import './Threads.css'
import PostField from '../../components/Threads/PostField';
import { dummyPosts } from './dummyPosts';
import Post from '../../components/Threads/Post';

const Threads: React.FC = () => {
    return (
        <IonPage>
            <div className='threads-space'>
                <div className="threads-container">
                    <div className='thread-scroller'>
                        <PostField/>
                        {dummyPosts.map(post => (
                        <Post 
                        key={post.idthread}
                        idthread={post.idthread}
                        usuario={post.usuario}
                        descripcion={post.descripcion}
                        posttime={post.posttime}
                        imagen={post.imagen}
                        />
                    ))}
                    </div>
                    

                </div>
            </div>
        </IonPage>
    )
}

export default Threads;