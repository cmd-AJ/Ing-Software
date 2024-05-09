import React from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonImg,
} from "@ionic/react";
import "./Explain.css";

interface InfoCardProps {
  title: string;
  content: string;
  imageUrl: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, content, imageUrl }) => {
  const imageStyle = {
    backgroundImage: `url(${imageUrl})`,
  };
  return (
    <div className="info-content">
      <div className="content-title">
        <h2 className="text-title">{title}</h2>
        <p className="content-style">{content}</p>
      </div>
      <div className="circular-image-wrapper">
        <div className="image-holder" style={imageStyle}></div>
      </div>
    </div>
  );
};

export default InfoCard;
