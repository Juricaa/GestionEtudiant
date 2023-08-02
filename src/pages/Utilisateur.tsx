import React, { useState, useEffect } from 'react';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonMenu, IonMenuButton, IonPage, IonText, IonTitle, IonToolbar,IonPopover, } from '@ionic/react';
import { create, ellipsisHorizontal, ellipsisVertical, helpCircle, search, personCircle, star, personAddOutline,notificationsOutline, logOutOutline, personCircleOutline } from 'ionicons/icons';
import AuthenticationService from '../services/AuthenticationService';
import { useHistory } from 'react-router-dom'; // Importez useHistory depuis react-router-dom
//import List from '../components/user-list';
import Exam from '../components/information/Information';
import Modification from '../components/utilisateur/modificationUser';




const Utilisateur: React.FC = () => {
    
    // Obtenez l'utilisateur actuellement connecté
  const currentUser = AuthenticationService.getCurrentUser();

  const utilisateurNom: string = AuthenticationService.getCurrentUserName() || '';
  const utilisateurPrenom: string = AuthenticationService.getCurrentUserSurname() || ''; // Utilisez la fonction pour obtenir l'ID de l'utilisateur connecté,

  const history = useHistory(); // Obtenez l'objet history

  // État pour afficher/masquer le IonPopover
  const [showPopover, setShowPopover] = useState(false);

  // Fonction pour gérer l'affichage du IonPopover
  const handleShowPopover = (event: any) => {
    event.persist();
    setShowPopover(true);
  };

  // Fonction pour masquer le IonPopover
  const handleHidePopover = () => {
    setShowPopover(false);
  };

  // Fonction pour gérer les actions du menu contextuel
  const handlePopoverAction = (action: string) => {
    switch (action) {
      case 'notifications':
        // Ajoutez ici la logique pour les notifications
        break;
      case 'logout':
        // Ajoutez ici la logique pour la déconnexion
        // Par exemple, déconnectez l'utilisateur et redirigez-le vers la page de connexion
        console.log('Déconnexion réussie');
        //AuthenticationService.logout();
        history.push('/login'); // Naviguer vers la page "Login"
        break;
      default:
        break;
    }
    setShowPopover(false); // Masquer le IonPopover après avoir effectué l'action
  };

  

  
  // Fonction pour gérer la redirection vers une autre page
  const handleRedirection = (route: string) => {
    history.push(route); // Redirigez l'utilisateur vers la route spécifiée
  };

 // État pour afficher/masquer le composant Modification
 const [showModification, setShowModification] = useState(false);

 function OnModifier(): void {
   setShowModification(true);
 }

 // Fonction pour masquer le composant Modification
 const hideModification = () => {
   setShowModification(false);
 }

    
  return (
    <>
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu Content</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">This is the menu content.</IonContent>
      </IonMenu>


      <IonPage id="main-content">
        
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            
            <IonButtons slot="secondary">
                <IonButton onClick={() => OnModifier()}>
                 <IonIcon slot="icon-only" icon={personCircleOutline}></IonIcon>
                 
                </IonButton>
            
                <IonButton onClick={() => handleRedirection('/acueil')}>
                 <IonIcon slot="icon-only" icon={personAddOutline}></IonIcon>
                 
                </IonButton>
        
            </IonButtons>
          
            <IonButtons slot="primary">
                <IonButton onClick={handleShowPopover}>
                    
                    <IonIcon slot="icon-only" ios={ellipsisHorizontal} md={ellipsisVertical}></IonIcon>
                </IonButton>
            </IonButtons>

             {/* IonPopover pour les options de notification et de déconnexion */}
          <IonPopover isOpen={showPopover} onDidDismiss={handleHidePopover}>
            <IonButton onClick={() => handlePopoverAction('notifications')}>
              <IonIcon slot="icon-only" icon={notificationsOutline} />
            </IonButton>
            <IonButton onClick={() => handlePopoverAction('logout')}>
              <IonIcon slot="icon-only" icon={logOutOutline} />
            </IonButton>
          </IonPopover>
        
            <IonTitle>Accueil</IonTitle>
            

          </IonToolbar>
        </IonHeader>

        
        <IonContent className="ion-padding">
            

        
        <p>Bienvenue   </p>
        <p>Vous êtes connecté en tant qu&apos;Utilisateur {utilisateurNom} {utilisateurPrenom}</p>
        
        
            
            
            {/* Composant Modification */}
          {showModification && <Modification onClose={hideModification} />}
      
        </IonContent>

      </IonPage>
    </>
  );
};

export default Utilisateur;