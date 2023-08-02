// src/services/authentication.service.ts

import axios from 'axios';
import User from '../models/User';



class AuthenticationService {
  private currentUser: User | null = null;

  async login(username: string, password: string): Promise<boolean> {
    try {
      // Effectuer la requête HTTP au backend pour vérifier les informations de connexion
      
      const response = await axios.post('http://localhost:8081/api/utilisateurs/login', { username, password });
        
      
      const user: User = response.data;

      // Stocker les informations de l'utilisateur connecté localement
      this.currentUser = user;
      

      return true;
    } catch (error) {
      console.error('Erreur lors de la connexion', error);
     
      return false;
    }
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  getCurrentUserName(): string | null {
    return this.currentUser?.nom || null;
  }

  getCurrentUserSurname(): string | null {
    return this.currentUser?.prenom || null;
  }

  getCurrentUserId(): string | null {
    return this.currentUser?.utilisateurId || null;
  }

  isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }
}

export default new AuthenticationService();
