// src/services/UserService.ts

import axios from 'axios';
import User from '../models/User';
import AuthenticationService from './AuthenticationService';

class UserService {
  private baseURL: string;

  constructor() {
    // Remplacez 'http://localhost:3000' par l'URL de votre backend Express.js
    this.baseURL = 'http://localhost:8081/api/utilisateurs';
  }

  async getUsers(): Promise<User[]> {
    try {
      const response = await axios.get<User[]>(`${this.baseURL}/`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs', error);
      return [];
    }
  }

  async findAllWithStatutZero(): Promise<User[]> {
    try {
      const response = await axios.get<User[]>(`${this.baseURL}/statut`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs', error);
      return [];
    }
  }

  async addUser(user: User): Promise<User | null> {
    try {
      const response = await axios.post<User>(`${this.baseURL}/`, user);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'utilisateur', error);
      return null;
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      await axios.delete(`${this.baseURL}/${id}`);
      return true;
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur', error);
      return false;
    }
  }

  //Accepter en membre
  async updateStatut(userId: any, newStatut: any) {
    try {
    
      const response = await axios.put(`${this.baseURL}/${userId}/statut`, { statut: newStatut });
      // Mise à jour réussie, actualisez la liste des utilisateurs
      console.log(response.data); 
     // console.log(response.data); // Afficher la réponse du backend
    // Mise à jour réussie, actualisez la liste des utilisateurs
    this.findAllWithStatutZero();
    } catch (error) {
      
      console.error('Erreur lors de la mise à jour du statut de l\'utilisateur', error);
    }
  }
///mis a jour information membre 
  async updateUserStatut(user: any) {
    try {
      const userId= user.utilisateurId;
      console.log (userId);
      console.log ("mandea izy ty ato");
      const response = await axios.put(`${this.baseURL}/${userId}/`, user );
      
      // Mise à jour réussie, actualisez la liste des utilisateurs
      console.log(response.data); // Afficher la réponse du backend
    // Mise à jour réussie, actualisez la liste des utilisateurs
      
    } catch (error) {
      
      console.error('Erreur lors de la mise à jour du statut de l\'utilisateur', error);
    }
  }
}


  

export default new UserService();
