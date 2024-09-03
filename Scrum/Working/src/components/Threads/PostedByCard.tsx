import React from 'react';
import { IonCard, IonCardHeader, IonCardSubtitle } from '@ionic/react';
import './PostedByCards.css';

interface PostByCardProps {
  usuario: string;
  posttime: string;
}

const PostByCard: React.FC<PostByCardProps> = ({ usuario, posttime }) => {
  return (
    <IonCard className="postedby-card">
      <IonCardHeader className="postedby-header">
        <IonCardSubtitle className="postedby-usuario">{usuario}</IonCardSubtitle>
        <p className="postedby-time">{new Date(posttime).toLocaleString()}</p>
      </IonCardHeader>
    </IonCard>
  );
};


export default PostByCard;
