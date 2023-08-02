import React, { useState, useEffect } from 'react';
import { IonContent, IonList, IonItem, IonLabel, IonHeader, IonTitle, IonToolbar, IonPage, IonListHeader, IonButtons, IonButton, IonIcon } from '@ionic/react';
import UserService from '../../services/UserService';
import { arrowBack, closeCircle, refreshCircle, removeCircleOutline, shieldCheckmark, shieldCheckmarkOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

const UserWait: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const history = useHistory();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await UserService.findAllWithStatutZero();
      setUsers(response);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs', error);
    }
  };

  const handleGoBack = () => {
    history.push('/accueil');
  };

  const handleRedirection = (route: string) => {
    history.push(route);
  };

  const handleUpdateStatut = async (userId: any, newStatut: any) => {
    try {
      await UserService.updateStatut(userId, newStatut);
      // Actualiser la liste des utilisateurs après la mise à jour du statut
      fetchUsers();
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut de l\'utilisateur', error);
    }
  };

    async function handleDeleteUser(utilisateurId: any): Promise<void> {
        try {
            await UserService.delete(utilisateurId);
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
          <IonButtons slot="start">
            <IonButton onClick={handleGoBack}>
              <IonIcon icon={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>Liste des demandes d&apos;approbations et Supression</IonTitle>

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
            <IonLabel>Action</IonLabel>
          </IonListHeader>
          {users.map((user) => (
            <IonItem key={user.utilisateurId}>
              <IonLabel>#{user.utilisateurId}</IonLabel>
              <IonLabel>{user.nom}</IonLabel>
              <IonLabel>{user.prenom}</IonLabel>
              <IonLabel>
                <IonButton onClick={() => handleUpdateStatut(user.utilisateurId, user.statut === 0 ? 1 : 0)}>
                  <IonIcon slot="icon-only" icon={shieldCheckmark}></IonIcon>
                </IonButton>
                <IonButton onClick={() => handleDeleteUser(user.utilisateurId)}>
                  <IonIcon slot="icon-only" icon={closeCircle}></IonIcon>
                </IonButton>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default UserWait;
