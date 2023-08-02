// src/models/User.ts

import { ReactNode } from "react";

interface User {
    utilisateurId: any;
    
    
    nom: string;
    prenom: string;
    email: string;
    motDePasse: string;
    role: string;
  }
  
  export default User;
  