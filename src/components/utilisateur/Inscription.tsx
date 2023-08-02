import React, { useState, useRef } from 'react';
import {IonButtons,IonButton, IonHeader,IonContent, IonToolbar,IonTitle, IonPage, IonItem,IonLabel,IonInput,IonText,} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import UserService from '../../services/UserService';
import User from '../../models/User';


const AddUserForm: React.FC = () => {
  const history = useHistory(); // Obtenez l'objet history
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const [user, setUser] = useState<User>({
    utilisateurId: '',
    nom: '',
    prenom: '',
    email: '',
    motDePasse: '',
    role: '',
  });
  
  const handleAddUser = async () => {
    try {
      // Vérifier que tous les champs sont remplis
      if (!user.nom || !user.prenom || !user.email || !user.motDePasse) {
        setErrorMessage('Veuillez remplir tous les champs.');
        return;
      }

      // Vérifier que le mot de passe a au moins 8 caractères
      if (user.motDePasse.length < 8) {
        setErrorMessage('Le mot de passe doit contenir au moins 8 caractères.');
        return;
      }
      // Appeler le service UserService pour ajouter l'utilisateur
      await UserService.addUser(user);

      // Réinitialiser le formulaire après l'ajout réussi
      setUser({
        utilisateurId: '',
        nom: '',
        prenom: '',
        email: '',
        motDePasse: '',
        role: '',
      });

      console.log('Utilisateur ajouté avec succès !');
      history.push('/home')
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'utilisateur', error);
    }
  };

  function confirm() {
    handleAddUser();
  }

  function annuler () {
    history.push('/home'); // Naviguer vers la page "Accueil"
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => annuler()}>Retour</IonButton>
          </IonButtons>
          <IonTitle>Formulaire d&apos;inscription</IonTitle>
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
          <IonLabel position="floating">Mot de passe</IonLabel>
          <IonInput type="password" value={user.motDePasse} onIonChange={(e) => setUser({ ...user, motDePasse: e.detail.value! })} />
        </IonItem>

        {errorMessage && <IonText color="danger">{errorMessage}</IonText>}
      </IonContent>
    </IonPage>
  );
}

export default AddUserForm;
