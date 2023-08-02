// src/services/InformationService.ts

import axios from 'axios';
import Information from '../models/Information';

class InformationService {
  private baseURL: string;

  constructor() {
    // Remplacez 'http://localhost:8081' par l'URL de votre backend Express.js
    this.baseURL = 'http://localhost:8081/api/informations';
  }

  
  async addInfo(information: Information): Promise<void> {
      try {
          const response = await axios.post(`${this.baseURL}/`, information);
          console.log('Information ajoutée avec succès !');
          return response.data; 
          
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'information', error);
        }
    }
    
    async getInformations(): Promise<Information[]> {
      try {
        const response = await axios.get<Information[]>(`${this.baseURL}/`);
        return response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des informations', error);
        return [];
      }
    }

  async updateInformation(informationId: string, updatedInfo: Information): Promise<void> {
    try {
      await axios.put(`${this.baseURL}/${informationId}`, updatedInfo);
      console.log('Information mise à jour avec succès !');
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'information', error);
    }
  }

  async deleteInformation(informationId: string): Promise<void> {
    try {
      await axios.delete(`${this.baseURL}/${informationId}`);
      console.log('Information supprimée avec succès !');
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'information', error);
    }
  }
}

export default new InformationService();
