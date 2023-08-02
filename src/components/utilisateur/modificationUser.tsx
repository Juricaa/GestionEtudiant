import React, { useState, useRef , useEffect} from 'react';
import {
  IonButtons,
  IonButton,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonItem,
  IonLabel,
  IonInput,
  IonText,
} from '@ionic/react';
import { OverlayEventDetail } from '@ionic/core/components';
import { useHistory } from 'react-router-dom'; // Importez useHistory depuis react-router-dom
import UserService from '../../services/UserService';
import User from '../../models/User';
import AuthenticationService from '../../services/AuthenticationService';



type ModificationProps = {
    onClose: () => void;
  };

const Modification: React.FC <ModificationProps> = ({ onClose }) => {
  const history = useHistory(); // Obtenez l'objet history
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);
  const currentUser = AuthenticationService.getCurrentUser();
  const [errorMessage, setErrorMessage] = useState('');

  //const [users, setUsers] = useState<any[]>([]);
  const [user, setUser] = useState<User>({
    utilisateurId: currentUser?.utilisateurId || '',
    nom: currentUser?.nom || '',
    prenom: currentUser?.prenom || '',
    email: currentUser?.email || '',
    motDePasse: '',
    role: '',
  });

  useEffect(() => {
    setUser({
      utilisateurId: currentUser?.utilisateurId || '',
      nom: currentUser?.nom || '',
      prenom: currentUser?.prenom || '',
      email: currentUser?.email || '',
      motDePasse: '',
      role: '',
    });
  }, [currentUser]);

  
  
  const handleUpdateUser = async () => {
    try {
        
      // Vérifier que tous les champs sont remplis
      if (!user.nom || !user.prenom || !user.email || !user.motDePasse ) {
        setErrorMessage('Veuillez remplir tous les champs.');
        return;
      }

       
      // Vérifier que le mot de passe a au moins 8 caractères
      if (user.motDePasse.length < 4) {
        setErrorMessage('Le mot de passe doit contenir au moins 8 caractères.');
        return;
      }
      user.utilisateurId=currentUser?.utilisateurId || '';
      // Appeler le service UserService pour ajouter l'utilisateur
      await UserService.updateUserStatut(user);

      // Réinitialiser le formulaire après l'ajout réussi
      setUser({
        utilisateurId:  '',
        nom: '',
        prenom: '',
        email: '',
        motDePasse: '',
        role: '',
      });

      

     // console.log('Mise à jour réussie !');
      history.push('/accueil')
    } catch (error) {
      console.error('Erreur lors de Mise à jour de l\'utilisateur', error);
    }
  };

  function confirm() {
    handleUpdateUser();


  }

   

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => onClose()}>Retour</IonButton>
              </IonButtons>

              
              <IonTitle>Formulaire de Modification</IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={() => confirm()}>
                  Confirm
                </IonButton>
              </IonButtons>
        </IonToolbar>
      </IonHeader>

    <IonContent className="ion-padding">
        
        
        <IonItem>
          <IonLabel position="floating">Nom</IonLabel>
          <IonInput value={user.nom} onIonChange={(e) => setUser({ ...user, nom: e.detail.value! })} />
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Prénom</IonLabel>
          <IonInput value={user.prenom} onIonChange={(e) => setUser({ ...user, prenom: e.detail.value! })} />
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput value={user.email} onIonChange={(e) => setUser({ ...user, email: e.detail.value! })} />
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Entrez Mot de passe pour confirmer</IonLabel>
          <IonInput type="password" value={user.motDePasse} onIonChange={(e) => setUser({ ...user, motDePasse: e.detail.value! })} />
        </IonItem>
           
            {errorMessage && <IonText color="danger">{errorMessage}</IonText>}
            
        
      </IonContent>
      
    </IonPage>
  );
}

export default Modification;