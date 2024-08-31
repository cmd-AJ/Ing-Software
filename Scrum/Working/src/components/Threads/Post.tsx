// src/components/Post.tsx

import React from 'react';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonImg } from '@ionic/react';
import PostByCard from './PostedByCard';
import './Post.css'

interface PostProps {
  idthread: string;
  usuario: string;
  descripcion: string;
  posttime: string;
  imagen: string; // base64 or URL
}
//This component will be mapped
const Post: React.FC<PostProps> = ({ idthread, usuario, descripcion, posttime, imagen }) => {
  return (
    <IonCard>
      <PostByCard usuario={usuario} posttime={posttime} /> {/* User profile into post*/}
      <IonCardHeader>
        <IonCardSubtitle>{usuario}</IonCardSubtitle>
        <IonCardTitle>{`Thread ID: ${idthread}`}</IonCardTitle>
        <p>{new Date(posttime).toLocaleString()}</p>
      </IonCardHeader>
      
      {imagen && <IonImg src={imagen} alt="Post image" />}

      <IonCardContent>
        <p>{descripcion}</p>
      </IonCardContent>
    </IonCard>
  );
};

export default Post;
