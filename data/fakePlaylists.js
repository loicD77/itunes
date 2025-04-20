// data/fakePlaylists.js

// Tableau de playlists pré-définies, visibles dès l’ouverture de l’app
// Chaque playlist a :
// - un id unique (en dur ici),
// - un titre (nom affiché à l’utilisateur),
// - une description,
// - un terme de recherche (utilisé avec l’API iTunes pour récupérer les morceaux),
// - une image locale (visuel d’illustration).

export const PREDEFINED_PLAYLISTS = [
  {
    id: '1',
    title: 'Chill',                                     // Titre affiché
    description: 'Ambiance détente et vibes relaxantes',// Description courte
    term: 'lofi chill',                                 // Mot-clé utilisé dans la recherche iTunes
    image: require('../assets/chill.jpg'),              // Image stockée localement
  },
  {
    id: '2',
    title: 'Workout',
    description: 'Pour te motiver à la salle',
    term: 'workout beats',
    image: require('../assets/workout.jpg'),
  },
  {
    id: '3',
    title: 'Lozic Party',
    description: 'Bouge ta tête avec les meilleurs sons',
    term: 'party hits',
    image: require('../assets/party.jpg'),
  },
  {
    id: '4',
    title: 'Focus',
    description: 'Concentration maximum 🎯',
    term: 'focus study music',
    image: require('../assets/focus.jpg'),
  },
];
