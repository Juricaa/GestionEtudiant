import React, { useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonInput, IonItem, IonList } from '@ionic/react';
import InformationService from '../../services/InformationService';
import Information from '../../models/Information';
import AuthenticationService from '../../services/AuthenticationService';
import { information } from 'ionicons/icons';


type AddInfoProps = {
  onClose: () => void;
};

const AddInfo: React.FC<AddInfoProps> = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCreateInfo = async () => {
    if (title.trim() === '' || content.trim() === '') {
      // Vous pouvez afficher un message d'erreur ici si le titre ou le contenu est vide
      return;
    }

    const newInfo: Information = {
      informationId: undefined,
      titre: title,
      contenu: content,
      datePublication: new Date(),
      utilisateurId:  AuthenticationService.getCurrentUserId() || '', // Utilisez la fonction pour obtenir l'ID de l'utilisateur connecté,
      
      
    };
    
    await InformationService.addInfo(newInfo);
    //onClose(); // Fermer le formulaire après la création de l'information
    console.log(newInfo);
    
  };


  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Creer publication</IonCardTitle>
        <IonCardSubtitle>champ saisi</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>
        <IonList>
          <IonItem>
            <IonInput
              label="Titre"
              labelPlacement="stacked"
              clearInput={true}
              placeholder="Entrez le mot clé d'information"
              value={title}
              onIonChange={(e) => setTitle(e.detail.value!)}
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonInput
              label="Description"
              labelPlacement="stacked"
              clearOnEdit={true}
              placeholder="contenue de l'information"
              value={content}
              onIonChange={(e) => setContent(e.detail.value!)}
            ></IonInput>
          </IonItem>
        </IonList>
      </IonCardContent>

      <IonButton fill="clear" onClick={onClose}>
        Annuler
      </IonButton>
      <IonButton fill="clear" onClick={handleCreateInfo}>
        Publier
      </IonButton>
    </IonCard>
  );
};

export default AddInfo;
