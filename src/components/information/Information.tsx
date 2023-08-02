import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';



type ActualiteProps = {
  onClose: () => void;
};




const Exam : React.FC <ActualiteProps> = ({ onClose }) =>{
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Card Title dzded</IonCardTitle>
        <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>Here&apos;s a small text description for the card content. Nothing more, nothing less.</IonCardContent>
    </IonCard>
    
    
  );
}
export default Exam;