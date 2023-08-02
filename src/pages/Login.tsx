import React from 'react';
import { IonInput, IonItem, IonList, IonButton,IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle  } from '@ionic/react';
import LoginSession from '../components/utilisateur/LoginForm';


function Example() {
  return (

    <IonCard color="">
      <IonCardHeader>
        <IonCardTitle>Gestion Edutiant</IonCardTitle>
        <IonCardSubtitle>utilisateur information</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>
        
      <IonList color="">
      
        <LoginSession />

      
    </IonList>



      </IonCardContent>
    </IonCard>


    
  );
}

export default Example;
