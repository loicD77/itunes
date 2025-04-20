// Import de React et du contexte utilisateur
import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

// Import des playlists prédéfinies (simulées)
import { PREDEFINED_PLAYLISTS } from '../data/fakePlaylists';

// Import du contexte des playlists personnelles
import { UserPlaylistsContext } from '../contexts/UserPlaylistsContext';

// Composant d’affichage d’une playlist sous forme de carte
import PlaylistCard from '../components/PlaylistCard';

// Composant principal de l’écran "Playlists"
export default function PlaylistsScreen({ navigation }) {
  const { userPlaylists } = useContext(UserPlaylistsContext); // Accès aux playlists créées par l'utilisateur

  // Quand on clique sur une playlist prédéfinie ou perso, on navigue vers l'écran Results
  const handleSelect = (playlist) => {
    navigation.navigate('Results', { term: playlist.term });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Titre principal */}
      <Text style={styles.header}>🎵 Playlists Lozic</Text>

      {/* Affichage des playlists prédéfinies (Lozic Party, Chill, etc.) */}
      {PREDEFINED_PLAYLISTS.map((playlist) => (
        <PlaylistCard
          key={playlist.id}                   // Clé unique
          playlist={playlist}                 // Données de la playlist
          onPress={() => handleSelect(playlist)} // Action au clic
        />
      ))}

      {/* Si l’utilisateur a créé des playlists perso, on les affiche aussi */}
      {userPlaylists.length > 0 && (
        <>
          <Text style={styles.subHeader}>🎧 Tes playlists</Text>

          {userPlaylists.map((playlist) => (
            <PlaylistCard
              key={playlist.id}
              playlist={{
                ...playlist,
                image: require('../assets/default.jpg'), // Image par défaut pour les playlists perso
              }}
              onPress={() =>
                navigation.navigate('Results', { term: playlist.name }) // Utilise le nom comme mot-clé
              }
            />
          ))}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0b0c10', // Fond sombre
    padding: 20,
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1DB954', // Vert Spotify
    marginBottom: 20,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginTop: 30,
    marginBottom: 10,
  },
});
