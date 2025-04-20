// Import de React + useContext pour accéder aux playlists
import React, { useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet
} from 'react-native';

// Contexte global des playlists utilisateur
import { UserPlaylistsContext } from '../contexts/UserPlaylistsContext';

// Écran d’affichage des playlists créées par l’utilisateur
export default function MyPlaylistsScreen({ navigation }) {
  // Récupération des playlists via le contexte
  const { userPlaylists } = useContext(UserPlaylistsContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎧 Mes playlists</Text>

      {/* Si aucune playlist, afficher un message */}
      {userPlaylists.length === 0 ? (
        <Text style={styles.empty}>Aucune playlist pour le moment.</Text>
      ) : (
        // Sinon, afficher la liste avec FlatList
        <FlatList
          data={userPlaylists}                    // Liste des playlists
          keyExtractor={(item) => item.id}        // Clé unique (obligatoire pour FlatList)
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.playlistItem}
              onPress={() =>
                // Navigation vers le détail de la playlist
                navigation.navigate('UserPlaylistDetail', { playlist: item })
              }
            >
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.trackCount}>
                {item.tracks.length} morceau{item.tracks.length > 1 ? 'x' : ''}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0b0c10', // Fond sombre
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1DB954', // Vert Spotify
    marginBottom: 20,
  },
  empty: {
    color: '#ccc',
    fontStyle: 'italic', // Style "gris" si aucune playlist
  },
  playlistItem: {
    backgroundColor: '#1f1f1f',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  name: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  trackCount: {
    color: '#aaa',
    fontSize: 14,
  },
});
