import React, { useState, useEffect } from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonList, IonItem, IonLabel, IonAvatar, IonButtons, IonButton, IonIcon } from '@ionic/react';
import InformationService from '../../services/InformationService';
import { chatbubble, heart, pencil, share } from 'ionicons/icons';
import AuthenticationService from '../../services/AuthenticationService';
import { useHistory } from 'react-router-dom';



type ActualiteProps = {
    onClose: () => void;
  };
  
const InformationList: React.FC <ActualiteProps> = ({ onClose })  => {
  const [informations, setInformations] = useState<any[]>([]);
  const history = useHistory(); // Obtenez l'objet history
  useEffect(() => {
    // Fonction pour récupérer les informations depuis le backend
    const fetchInformations = async () => {
      try {
        const response = await InformationService.getInformations();
        setInformations(response);
      } catch (error) {
        console.error('Erreur lors de la récupération des informations', error);
      }
    };

    fetchInformations();
  }, []);


  // Fonction pour formater la date et l'heure avec les minutes
  const formatDateWithMinutes = (dateStr: string) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    return date.toLocaleString('fr-FR', options);
  };
        // Vérifier si l'utilisateur est un administrateur
        const isAdmin = AuthenticationService.isAdmin();

        const handleEditInformation = (informationId: number) => {
            // Remplacez "/edit" par l'URL de votre page de modification
            history.push(`/edit/${informationId}`);
          };
          
  
  return (
    <IonContent>
      <IonList>
        {informations.map((info) => (
          <IonCard key={info.informationId}>

            <IonCardHeader>
                    <IonCardTitle>

                    <IonItem>
                        <IonAvatar slot="start">
                            <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                        </IonAvatar>
                        <IonLabel>{info.nom} {info.prenom}</IonLabel>
                        <IonLabel> </IonLabel>

                        {isAdmin && (
                <IonButtons slot="end">
                  {/* Bouton de modification uniquement pour l'administrateur */}
                  <IonButton fill="clear" onClick={() => handleEditInformation(info.informationId)}>
                    <IonIcon icon={pencil} />
                  </IonButton>
                  </IonButtons> )}

                    </IonItem>
                    
                        
                         
                         <IonCardSubtitle> 

                                <IonLabel>Publié le {formatDateWithMinutes(info.datePublication)}</IonLabel>

                         </IonCardSubtitle>

                    {info.titre}
                        
                    </IonCardTitle>


                    
                            <IonLabel></IonLabel>
            </IonCardHeader>

            <IonCardContent>
                <IonItem>
                    <IonLabel>{info.contenu}</IonLabel>
                </IonItem>
            </IonCardContent>

            <IonItem>
                    <IonButtons slot="start">
                        <IonButton fill="clear">
                            <IonIcon icon={heart} />
                        </IonButton>
                    </IonButtons>
                    
                    

                    
                    
                    <IonButtons slot="end" >
                        <IonButton fill="clear">
                            <IonIcon icon={chatbubble}  />
                        </IonButton>
                    </IonButtons>
                    
            </IonItem>

          </IonCard>
        ))}
      </IonList>
    </IonContent>
  );
};

export default InformationList;
