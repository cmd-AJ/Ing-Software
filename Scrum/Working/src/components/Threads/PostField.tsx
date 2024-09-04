import React, { useState } from 'react';
import { IonItem, IonLabel, IonTextarea, IonIcon } from '@ionic/react';
import { camera } from 'ionicons/icons';
import './PostField.css';

const PostField: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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
      <div className='t-profile-container'></div>
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

