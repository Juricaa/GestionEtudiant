import React, { useState, useEffect } from 'react';
import { IonContent, IonList, IonItem, IonLabel, IonHeader, IonTitle, IonToolbar, IonPage, IonListHeader, IonButtons, IonButton, IonIcon } from '@ionic/react';
import UserService from '../../services/UserService';
import { arrowBack, refreshCircle, shieldCheckmark } from 'ionicons/icons'; // Importer l'icône arrowBack depuis ionicons/icons
import { useHistory } from 'react-router-dom'; // Importer useHistory depuis react-router-dom

//import { useHistory } from 'react-router-dom'; // Importez useHistory depuis react-router-dom



const UserList: React.FC = () => {
  const [user, setUsers] = useState<any[]>([]);
  const history = useHistory(); // Obtenez l'objet history

 

    // Fonction pour récupérer les utilisateurs depuis le backend Express.js
    const fetchUsers = async () => {
      try {
        const response = await UserService.getUsers();
        setUsers(response);
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs', error);
      }
    };

    useEffect(() => {
    
      fetchUsers();
  
    }, []);
    
   // Fonction pour gérer la navigation "retour à l'accueil"
   const handleGoBack = () => {
    history.push('/accueil'); // Naviguer vers la page "Accueil"
    
  };

  const handleUpdate = async (userId: any, newStatut: any) => {
    try {
      await UserService.updateStatut(userId, newStatut);
      // Actualiser la liste des utilisateurs après la mise à jour du statut
      fetchUsers();
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut de l\'utilisateur', error);
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
           {/* Ajouter le bouton "retour à l'accueil" en haut à gauche */}
           <IonButtons slot="start">
            <IonButton onClick={handleGoBack}>
              <IonIcon icon={arrowBack} />
            </IonButton>
          </IonButtons>

          <IonTitle>Liste des utilisateurs</IonTitle>

          {/* Ajouter le bouton "retour à l'accueil" en haut à gauche */}
          <IonButtons slot="start">
            <IonButton onClick={fetchUsers}>
              <IonIcon icon={refreshCircle} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        
        <IonList>

          <IonListHeader>
                
                <IonLabel>ID</IonLabel>
                <IonLabel>NOM</IonLabel>
                <IonLabel>Prénom</IonLabel>
                <IonLabel>Email</IonLabel>
                <IonLabel>Role</IonLabel>
                <IonLabel>Blocker</IonLabel>
                



          </IonListHeader>
          
          {user.map((users) => (
            <IonItem key={users.utilisateurId}>
              <IonLabel>#{users.utilisateurId}</IonLabel>
              <IonLabel>{users.nom}</IonLabel>
              <IonLabel>{users.prenom}</IonLabel>
              <IonLabel>{users.email}</IonLabel>
              <IonLabel>{users.role}</IonLabel>

              <IonLabel>
              <IonButton onClick={() => handleUpdate (users.utilisateurId, users.statut === 0 ? 1 : 0)}>
                  <IonIcon slot="icon-only" icon={shieldCheckmark}></IonIcon>
                </IonButton>

                

              </IonLabel>

            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>



  );
};

export default UserList;
