import React, { useState } from 'react';
import { IonButton, IonInput, IonItem, IonLabel, IonTextarea } from '@ionic/react';
import './PostField.css';


const PostField: React.FC = () => {
    const [inputText, setInputText] = useState('');
  
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log('Posted:', inputText);
      setInputText('');
    };
  
    return (
      <div className='post-field-container'>
        <div className='t-profile-container'></div>
        <form onSubmit={handleSubmit}>
          <IonItem>
            <IonLabel position="stacked">Write something</IonLabel>
            <IonTextarea
              value={inputText}
              onIonChange={(e) => setInputText(e.detail.value!)}
              placeholder="Type your message..."
              autoGrow={true}
            />
          </IonItem>
          <IonButton expand="full" type="submit" className="post-button">
            Post
          </IonButton>
        </form>
      </div>
    );
  };
  
  export default PostField;
  