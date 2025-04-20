// services/api.js

import axios from 'axios'; // Librairie HTTP pour faire des requêtes API facilement

// Fonction pour interroger l’API iTunes avec un mot-clé donné
export const searchiTunes = async (term) => {
  try {
    // Requête GET vers l’API iTunes
    const response = await axios.get(`https://itunes.apple.com/search`, {
      params: {
        term,        // Mot-clé recherché (ex : “drake”)
        limit: 25,   // Nombre de résultats max
        media: 'music' // Type de contenu : uniquement de la musique
      },
    });

    // Retourne uniquement la liste des résultats (tableau de morceaux)
    return response.data.results;
  } catch (error) {
    // Si une erreur survient (ex : problème de réseau), on affiche un message
    console.error('Erreur API iTunes', error);
    return []; // Retourne un tableau vide pour éviter que l’app plante
  }
};
