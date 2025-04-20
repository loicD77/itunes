// Import de React et du contexte Audio
import React, { useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import { AudioContext } from '../contexts/AudioContext'; // Accès aux fonctions de lecture audio

// Composant d’affichage du détail d’une playlist perso
export default function UserPlaylistDetailScreen({ route }) {
  const { playlist } = route.params; // On récupère la playlist envoyée en paramètre

  const { playTrack, setTrackQueue } = useContext(AudioContext); // Fonctions audio globales

  // Fonction : lire tous les morceaux de la playlist en commençant par le 1er
  const handlePlayAll = () => {
    if (playlist.tracks.length > 0) {
      setTrackQueue(playlist.tracks);       // Met tous les morceaux dans la file
      playTrack(playlist.tracks[0]);        // Lance le premier
    }
  };

  // Fonction : lire un morceau précis de la playlist
  const handlePlayTrack = (track) => {
    setTrackQueue(playlist.tracks);         // Met toute la playlist en file
    playTrack(track);                       // Lance le morceau choisi
  };

  return (
    <View style={styles.container}>
      {/* Nom de la playlist + nombre de morceaux */}
      <Text style={styles.title}>{playlist.name}</Text>
      <Text style={styles.count}>
        {playlist.tracks.length} morceau{playlist.tracks.length > 1 ? 'x' : ''}
      </Text>

      {/* Bouton "Lire toute la playlist" s’il y a au moins un morceau */}
      {playlist.tracks.length > 0 && (
        <TouchableOpacity onPress={handlePlayAll} style={styles.playButton}>
          <Text style={styles.playText}>▶️ Lire toute la playlist</Text>
        </TouchableOpacity>
      )}

      {/* Liste des morceaux (ou message si vide) */}
      <FlatList
        data={playlist.tracks}
        keyExtractor={(item) => item.trackId.toString()} // Clé unique obligatoire
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.trackItem}
            onPress={() => handlePlayTrack(item)} // Lecture du morceau cliqué
          >
            <Text style={styles.trackName}>{item.trackName}</Text>
            <Text style={styles.artist}>{item.artistName}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Aucun morceau enregistré pour le moment.
          </Text>
        }
      />
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
    color: '#1DB954', // Vert Spotify
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  count: {
    color: '#aaa',
    marginBottom: 20,
  },
  playButton: {
    backgroundColor: '#1DB954',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  playText: {
    color: '#fff',
    fontWeight: '600',
  },
  trackItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingVertical: 12,
  },
  trackName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  artist: {
    color: '#aaa',
    fontSize: 14,
  },
  empty: {
    color: '#999',
    fontStyle: 'italic',
    marginTop: 40,
    textAlign: 'center',
  },
});
