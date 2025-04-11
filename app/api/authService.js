// src/api/authService.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://91.134.83.5:8000';

// Créer une instance axios avec la configuration de base
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token d'authentification aux requêtes
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Service d'authentification
export const authService = {
  // Inscription utilisateur
  async register(userData) {
    try {
      // Adaptation des données pour correspondre à l'API
      const apiData = {
        username: userData.nom + userData.prenom, // Vous pouvez ajuster cette logique
        email: userData.email,
        password: userData.password
      };
      
      const response = await apiClient.post('/api/v1/users/register', apiData);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  // Connexion utilisateur
  async login(email, password) {
    try {
      const formData = new URLSearchParams();
      formData.append('username', email);  // L'API attend "username" même si c'est un email
      formData.append('password', password);
      
      const response = await apiClient.post('/api/v1/auth/login', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      
      if (response.data.access_token) {
        // Sauvegarder le token dans le stockage
        await AsyncStorage.setItem('userToken', response.data.access_token);
      }
      
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Déconnexion
  async logout() {
    try {
      await AsyncStorage.removeItem('userToken');
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  // Vérifier si l'utilisateur est connecté
  async isAuthenticated() {
    try {
      const token = await AsyncStorage.getItem('userToken');
      return token !== null;
    } catch (error) {
      console.error('Auth check error:', error);
      return false;
    }
  }
};

export default authService;