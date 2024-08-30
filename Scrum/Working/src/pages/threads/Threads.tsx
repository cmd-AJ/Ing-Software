import React from 'react';
import { IonPage } from '@ionic/react';
import './Threads.css'
import PostField from '../../components/Threads/PostField';

const Threads: React.FC = () => {
    return (
        <IonPage>
            <div className='threads-space'>
                <div className="threads-container">
                    {/* TO DO  ALL thread components*/}
                    <PostField/>
                </div>
            </div>
        </IonPage>
    )
}

export default Threads;