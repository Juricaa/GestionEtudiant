import React from 'react';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonMenu, IonMenuButton, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { create, ellipsisHorizontal, ellipsisVertical, helpCircle, search, personCircle, star } from 'ionicons/icons';
import AuthenticationService from '../services/AuthenticationService';
import { useHistory } from 'react-router-dom'; // Importez useHistory depuis react-router-dom
import List from '../components/utilisateur/user-list';
import Exam from '../components/information/Information';



const Home: React.FC = () => {

    // Obtenez l'utilisateur actuellement connecté
  const currentUser = AuthenticationService.getCurrentUser();

  const history = useHistory(); // Obtenez l'objet history

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
                <IonButton>
                 <IonIcon slot="icon-only" icon={personCircle}></IonIcon>
                </IonButton>
            
                <IonButton>
                 <IonIcon slot="icon-only" icon={search}></IonIcon>
                </IonButton>
        
            </IonButtons>
          
            <IonButtons slot="primary">
                <IonButton>
                    
                    <IonIcon slot="icon-only" ios={ellipsisHorizontal} md={ellipsisVertical}></IonIcon>
                </IonButton>
            </IonButtons>
        
            <IonTitle>Accueil</IonTitle>
            

          </IonToolbar>
        </IonHeader>

        
        <IonContent className="ion-padding">
        
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
    </>
  );
};

const AdminContent: React.FC = () => {
    return (
      <>
        {/* Contenu personnalisé pour l'administrateur */}

        
        
        
        
        
        <List />



        {/* Ajoutez ici le contenu spécifique à l'administrateur */}
      </>
    );
  };
  
  const MemberContent: React.FC = () => {
    return (
      <>
        {/* Contenu personnalisé pour le membre */}
        <IonText>Vous êtes connecté en tant que membre.</IonText>
        {/* Ajoutez ici le contenu spécifique au membre */}
      </>
    );
  };
export default Home;