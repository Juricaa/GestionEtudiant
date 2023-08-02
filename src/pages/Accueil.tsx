// src/pages/Home.tsx (ou Accueil.tsx, selon votre configuration)

import React from 'react';
import { IonContent, IonHeader, IonMenu, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import AuthenticationService from '../services/AuthenticationService';
import Admin from './admin';
import Utilisateur from './Utilisateur';

const Home: React.FC = () => {
  // Obtenez l'utilisateur actuellement connecté
  const currentUser = AuthenticationService.getCurrentUser();

  return (
    <IonPage>
      <IonContent>
        {currentUser && (
          <>
            <h1>Bienvenue {} !</h1>
            {currentUser.role === 'admin' ? (
              <AdminContent />
            ) : (
              <MemberContent />
            )}
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

const AdminContent: React.FC = () => {
  return (
    <>
      {/* Contenu personnalisé pour l'administrateur */}

      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu Content</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">This is the menu content.</IonContent>
      </IonMenu>

      
        <Admin />
      {/* Ajoutez ici le contenu spécifique à l'administrateur */}
    </>
  );
};

const MemberContent: React.FC = () => {
  return (
    <>
      {/* Contenu personnalisé pour le membre */}
      <IonText>Vous êtes connecté en tant que membre.</IonText>
      <Utilisateur />
      {/* Ajoutez ici le contenu spécifique au membre */}
    </>
  );
};

export default Home;
