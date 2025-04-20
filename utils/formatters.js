// utils/formatters.js

// Fonction utilitaire pour formater une date en format local (ex : jj/mm/aaaa)
export const formatDate = (dateStr) => {
    const date = new Date(dateStr);               // Convertit la chaîne en objet Date JS
    return date.toLocaleDateString();             // Retourne la date au format local de l’utilisateur
  };
  