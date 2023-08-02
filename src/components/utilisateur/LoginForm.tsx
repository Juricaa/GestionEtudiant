// src/components/LoginForm.tsx

import React, { useState } from 'react';
import { IonButton, IonInput, IonItem, IonLabel, IonText } from '@ionic/react';
import AuthenticationService from '../../services/AuthenticationService';
import { useHistory } from 'react-router-dom'; // Importez useHistory depuis react-router-dom

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory(); // Obtenez l'objet history

  const handleLogin = async () => {
    if (username.trim() === '' || password.trim() === '') {
      setErrorMessage('Veuillez saisir un nom d\'utilisateur et un mot de passe.');
      return;
    }

    const success = await AuthenticationService.login(username, password);

    if (success) {
      // Connexion réussie, redirigez l'utilisateur vers la page Accueil (Home) après la connexion réussie
      console.log('Connexion réussie');
      history.push('/accueil'); // Naviguer vers la page "Accueil"

    } else {
      setErrorMessage('Nom d\'utilisateur ou mot de passe incorrect.');
    }
  };

   // Ajoutez la fonction pour gérer la navigation vers la page d'inscription
   const handleSignUp = () => {
    history.push('/inscription'); // Naviguer vers la page "Inscription"
  };

  return (
    <>
      <IonItem>
        <IonLabel position="floating">Nom utilisateur</IonLabel>
        <IonInput
          type="text"
          value={username}
          onIonChange={(e) => setUsername(e.detail.value!)}
        />
      </IonItem>

      <IonItem>
        <IonLabel position="floating">Mot de passe</IonLabel>
        <IonInput
          type="password"
          value={password}
          onIonChange={(e) => setPassword(e.detail.value!)}
        />
      </IonItem>

      {errorMessage && <IonText color="danger">{errorMessage}</IonText>}

      <IonButton expand="full" onClick={handleLogin}>
        Se connecter
      </IonButton>


      <IonButton expand="full" onClick={handleSignUp}>
        S&apos;inscrire
      </IonButton>

    </>
  );
};

export default LoginForm;
