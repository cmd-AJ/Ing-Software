    // src/components/PostByCard.tsx

import React from 'react';
import { IonCard, IonCardHeader, IonCardSubtitle } from '@ionic/react';

interface PostByCardProps {
  usuario: string;
  posttime: string;
}

const PostByCard: React.FC<PostByCardProps> = ({ usuario, posttime }) => {
  return (
    <IonCard>
      <IonCardHeader>
        {/* {Here will get the user profile by its username and id} */}
        <IonCardSubtitle>{usuario}</IonCardSubtitle>
        <p>{new Date(posttime).toLocaleString()}</p>
      </IonCardHeader>
    </IonCard>
  );
};

export default PostByCard;