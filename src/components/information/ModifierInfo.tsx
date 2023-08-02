import React, { useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonInput, IonItem, IonList } from '@ionic/react';
import InformationService from '../../services/InformationService';
import Information from '../../models/Information';
import AuthenticationService from '../../services/AuthenticationService';
import { information } from 'ionicons/icons';
import { useParams } from 'react-router-dom';

type EditInfoProps = {
  onClose: () => void;
 // information: Information;
  information: Information | null; // Mettre à jour le type pour qu'il soit nullable

};

const EditInfo: React.FC<EditInfoProps> = ({ onClose, information }) => {
    const [title, setTitle] = useState(information?.titre || ''); // Utilisez l'opérateur de coalescence nulle pour gérer le cas où information est nul
    const [content, setContent] = useState(information?.contenu || ''); // Utilisez l'opérateur de coalescence nulle pour gérer le cas où information est nul
    const { informationId } = useParams<{ informationId: string }>(); // Obtenez l'identifiant de l'information à éditer à partir des paramètres d'URL
  
  const handleEditInfo = async () => {
    if (title.trim() === '' || content.trim() === '') {
      // Vous pouvez afficher un message d'erreur ici si le titre ou le contenu est vide
      return;
    }

    let updatedInfo: Information;

    if (information && information.informationId) {
      updatedInfo = {
        ...information,
        titre: title,
        contenu: content,
        datePublication: information.datePublication || new Date(), // Utilisez la date de publication actuelle si elle existe, sinon utilisez la date actuelle
        utilisateurId: information.utilisateurId || '', // Utilisez l'ID de l'utilisateur actuel s'il existe, sinon utilisez une valeur par défaut (par exemple, une chaîne vide)
      };
    } else {
      // Si information est nulle ou si informationId est absent, utilisez des valeurs par défaut pour informationId, datePublication et utilisateurId
      updatedInfo = {
        informationId: '',
        titre: title,
        contenu: content,
        datePublication: new Date(), // Utilisez la date actuelle comme valeur par défaut pour datePublication
        utilisateurId: '', // Utilisez une valeur par défaut pour utilisateurId (par exemple, une chaîne vide)
      };
    }

    try { 
      await InformationService.updateInformation(updatedInfo.informationId, updatedInfo);
      console.log('Information mise à jour avec succès !');
      onClose(); // Fermer le formulaire après la mise à jour de l'information
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'information', error);
    }
  };

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Modifier publication</IonCardTitle>
        <IonCardSubtitle>champs saisis</IonCardSubtitle>
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
              placeholder="contenu de l'information"
              value={content}
              onIonChange={(e) => setContent(e.detail.value!)}
            ></IonInput>
          </IonItem>
        </IonList>
      </IonCardContent>

      <IonButton fill="clear" onClick={onClose}>
        Annuler
      </IonButton>
      <IonButton fill="clear" onClick={handleEditInfo}>
        Modifier
      </IonButton>
    </IonCard>
  );
};

export default EditInfo;
