// Importations de React et des composants React Native
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';

// Liste des styles musicaux disponibles pour l’utilisateur
// Chaque genre est lié à un terme de recherche utilisé avec l’API iTunes

const GENRES = [   //  Ce tableau contient donc des objets avec "clé , valeur"
  { label: 'Rap', term: 'drake' },     //  Si je clique sur Rap, j'aurai une recherche de drake
  { label: 'Pop', term: 'taylor swift' }, // Si je clique sur Pop, j'aurai une recherche de taylor swift
  { label: 'Classique', term: 'mozart' }, // Si je clique sur Classique, j'aurai une recherche de mozart
  { label: 'Rock', term: 'nirvana' }, // Si je clique sur Rock, j'aurai une recherche de nirvana
  { label: 'Jazz', term: 'miles davis' }, // Si je clique sur Jazz, j'aurai une recherche de miles davis
  { label: 'Électro', term: 'daft punk' }, // Si je clique sur Électro, j'aurai une recherche de daft punk
  { label: 'Reggae', term: 'bob marley' },// Si je clique sur Reggae, j'aurai une recherche de bob marley
  { label: 'Disco', term: 'disco' }, // Si je clique sur Disco, j'aurai une recherche de disco
];

// Composant principal : écran de sélection de style musical
export default function GenresScreen({ navigation }) {
  // Fonction appelée lorsqu’un genre est sélectionné
  // On redirige vers l’écran Results avec le bon mot-clé
  const handleGenreSelect = (genre) => {
    navigation.navigate('Results', { term: genre });
  };

  // Fonction pour choisir un genre au hasard
  const handleRandomTheme = () => {
    const randomGenre = GENRES[Math.floor(Math.random() * GENRES.length)];
    navigation.navigate('Results', { term: randomGenre.term });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Choisis un style de musique 🎵</Text>

      {/* Bouton spécial pour thème aléatoire */}
      <TouchableOpacity
        style={[styles.genreButton, styles.randomButton]}
        onPress={handleRandomTheme}
      >
        <Text style={styles.genreText}>🎲 Thème aléatoire</Text>
      </TouchableOpacity>

      {/* Boucle d’affichage des genres musicaux */}
      {GENRES.map(({ label, term }) => (
        <TouchableOpacity
          key={label}                    // Clé unique pour chaque bouton
          style={styles.genreButton}     // Style commun
          onPress={() => handleGenreSelect(term)} // Navigation avec le genre choisi
        >
          <Text style={styles.genreText}>{label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingBottom: 40,
    backgroundColor: '#0b0c10',  // Fond sombre
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    color: '#1DB954',            // Vert style Spotify
    marginBottom: 30,
    fontWeight: 'bold',
  },
  genreButton: {
    backgroundColor: '#1f1f1f',  // Fond gris foncé
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginVertical: 10,
    borderRadius: 10,
    width: '80%',
  },
  randomButton: {
    backgroundColor: '#1DB954', // Bouton spécial en vert
  },
  genreText: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
  },
});
