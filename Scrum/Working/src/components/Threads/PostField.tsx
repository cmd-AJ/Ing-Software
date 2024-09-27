import React, { useState } from 'react';
import { IonItem, IonLabel, IonTextarea, IonIcon } from '@ionic/react';
import { camera } from 'ionicons/icons';
import './PostField.css';
import { createThreadPost } from '../../controller/ThreadController';

interface PostFieldProps {
  onPostSubmit: () => void; // Prop type for the function to call after posting
}

const PostField: React.FC<PostFieldProps> = ({ onPostSubmit }) => {
  const [inputText, setInputText] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [imageString, setImageString] = useState<string | null>(null); // To hold the base64 string

  const userProfileData = localStorage.getItem('User');
  const userProfileImg = userProfileData ? JSON.parse(userProfileData) : null;
  const image = userProfileImg ? userProfileImg.image : '';

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const thread_sender = localStorage.getItem('dpi'); // DPI del usuario 
    console.log('Poster', thread_sender);
    console.log('Posted:', inputText);

    if (photo) {
      console.log('Photo:', photo.name);
    }

    await createThreadPost(thread_sender || '', inputText, imageString || '');

    onPostSubmit();

    setInputText('');
    setPhoto(null);
    setImageString(null); // Reset image string after submission
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedPhoto = event.target.files[0];
      setPhoto(selectedPhoto);

      // Convert image to base64 string
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageString(reader.result as string); // Store base64 string
      };
      reader.readAsDataURL(selectedPhoto); // Read the file as a data URL
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
            onIonInput={(e: any) => setInputText(e.target.value)} // Using onIonInput instead of onIonChange
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
          {imageString && (
            <div className="image-preview">
              <img src={imageString} alt="Preview" className="preview-image" />
            </div>
          )}
          {/* Render the Post button as soon as the user types at least one character */}
          {inputText.length > 0 && (
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
