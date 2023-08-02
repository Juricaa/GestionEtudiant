import React, { useState } from 'react';
import { Redirect, Route, useParams } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Login from './pages/Login';
import Accueil from './pages/Accueil';
import UserList from './components/utilisateur/user-list';
import AddUserForm from './components/utilisateur/Inscription';
import UserWait from './components/utilisateur/membre';
import AddInfo from './components/information/createInfo';
import EditInfo from './components/information/ModifierInfo';
import Information from './models/Information';



/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';


/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {

  // État pour gérer la visibilité du formulaire EditInfo
  const [showEditInfo, setShowEditInfo] = useState(false);

  // Fonction pour gérer la fermeture du formulaire EditInfo
  const handleCloseEditInfo = () => {
    setShowEditInfo(false);
  };

  // Récupérer l'identifiant de l'information à partir de la route
  //const { informationId } = useParams<{ informationId: string }>();
const [informations, setInformations] = useState<Information[]>([]);

  // Récupérer les informations de l'information à éditer en utilisant l'identifiant
  const informationToEdit = informations.find(info => info.informationId === informations);
  
  

  return (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>

        <Route exact path="/home">
          <Home />
        </Route>

        <Route exact path="/login">
          <Login />
        </Route>

        <Route exact path="/accueil">
          <Accueil />
        </Route>

        <Route exact path="/accueil/list">
          <UserList />
        </Route>

        <Route exact path="/inscription">
          <AddUserForm />
        </Route>

        <Route exact path="/acueil/addmembre">
          <UserWait />
        </Route>
        
        
          {/* Passer les informations de l'information à éditer à EditInfo */}
        <Route exact path="/information/edit/:informationId" >
          <EditInfo onClose={handleCloseEditInfo} information={informationToEdit || null} />
        </Route>
        
        <Route>
            <Redirect to="/login" />
        </Route>

      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
 );
};

export default App;
