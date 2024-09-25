import React, { useState } from 'react';
import { IonItem, IonLabel, IonTextarea, IonIcon } from '@ionic/react';
import { camera } from 'ionicons/icons';
import './PostField.css';
import { createThreadPost } from '../../controller/ThreadController';

const PostField: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);

  const thread_sender = localStorage.getItem('dpi')
  const userProfileData = localStorage.getItem('User');
  const userProfileImg = userProfileData ? JSON.parse(userProfileData) : null;
  const image = userProfileImg ? userProfileImg.image : '';
  
  console.log(image);
  console.log(thread_sender);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const post_sender = localStorage.getItem('dpi'); // DPI del usuario 

    console.log(post_sender);
    console.log(thread_sender);

    event.preventDefault();
    console.log('Posted:', inputText);
    if (photo) {
      console.log('Photo:', photo.name);
    }
    setInputText('');
    setPhoto(null);
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setPhoto(event.target.files[0]);
    }
  };

  return (
    <div className='post-field-container'>
      <div className='t-profile-container'>
        {userProfileImg ? (
          <img src={image} alt="User Profile" className="profile-image" />
        ) : (
          <div className='placeholder-image' />
        )}
      </div>
      <form onSubmit={handleSubmit} className="form-container">
        <IonItem className="input-container">
          <IonTextarea
            value={inputText}
            onIonChange={(e) => setInputText(e.detail.value!)}
            placeholder="Escribe algo..."
            autoGrow={true}
            className="textarea-input"
          />
        </IonItem>
        <div className="action-container">
          <IonIcon
            icon={camera}
            onClick={() => document.getElementById('uploadPhoto')?.click()}
            className="photo-icon"
          />
          <input
            type="file"
            id="uploadPhoto"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handlePhotoChange}
          />
          {inputText.trim() && (
            <button type="submit" className="post-button">
              Post
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PostField;

