import React, { useContext, useState } from 'react';
import {
  View, Text, StyleSheet, Image, TouchableOpacity,
  Alert, Modal, TextInput, FlatList
} from 'react-native';

// Import des deux contextes : audio (lecture) et playlists utilisateurs
import { AudioContext } from '../contexts/AudioContext';
import { UserPlaylistsContext } from '../contexts/UserPlaylistsContext';

// Composant MiniPlayer : petit lecteur audio toujours visible en bas de l’écran
export default function MiniPlayer() {
  // Récupération des données et fonctions du contexte audio
  const {
    currentTrack,              // Le morceau actuellement en cours
    isPlaying,                 // Booléen : la musique est-elle en train de jouer ?
    pauseTrack,                // Fonction pour mettre en pause
    resumeTrack,               // Fonction pour reprendre la lecture
    playNext,                  // Lire le morceau suivant dans la file
    playPrevious,              // Lire le précédent
    setRandomGenreQueue        // Joue un style musical aléatoire
  } = useContext(AudioContext);

  // Contexte des playlists personnalisées de l'utilisateur
  const {
    userPlaylists,             // Liste des playlists personnelles de l’utilisateur
    addTrackToPlaylist,        // Fonction pour ajouter un morceau à une playlist existante
    createPlaylist             // Fonction pour créer une nouvelle playlist
  } = useContext(UserPlaylistsContext);

  // État local pour afficher ou cacher le modal d’ajout
  const [modalVisible, setModalVisible] = useState(false);

  // État pour stocker le nom de la nouvelle playlist à créer
  const [newPlaylistName, setNewPlaylistName] = useState('');

  // Si aucun morceau n’est en cours, ne rien afficher (retourne null)
  if (!currentTrack) return null;

  // Quand on appuie sur "➕", on ouvre le modal d’ajout, on utilise une fonction fléchée
  const handleAddToPlaylist = () => {  
    setModalVisible(true);
  };

  // Quand l’utilisateur sélectionne une playlist existante, on utilise une fonction fléchée
  const handleSelectPlaylist = (playlist) => {
    addTrackToPlaylist(playlist.id, currentTrack); // Ajoute le morceau
    Alert.alert("✅ Ajouté", `Ajouté à la playlist "${playlist.name}"`);
    setModalVisible(false);
  };

  // Création d’une nouvelle playlist + ajout immédiat du morceau
  const handleCreateAndAdd = () => {
    if (newPlaylistName.trim()) {
      createPlaylist(newPlaylistName); // Création
      setTimeout(() => {
        // On attend un court instant, puis on retrouve la playlist créée
        const created = userPlaylists.find(p => p.name === newPlaylistName);
        if (created) addTrackToPlaylist(created.id, currentTrack);
      }, 200);
      setModalVisible(false);
      setNewPlaylistName(''); // Réinitialisation du champ texte
    }
  };

  return (
    <>
      {/* Mini-lecteur toujours visible */}
      <View style={styles.container}>
        {/* Image de la pochette du morceau */}
        <Image source={{ uri: currentTrack.artworkUrl100 }} style={styles.image} />

        {/* Infos sur le morceau : titre + artiste */}
        <View style={styles.infoContainer}>
          <Text style={styles.title} numberOfLines={1}>{currentTrack.trackName}</Text>
          <Text style={styles.artist} numberOfLines={1}>{currentTrack.artistName}</Text>
        </View>

        {/* Boutons de contrôle du lecteur */}
        <View style={styles.controls}>
          <TouchableOpacity onPress={playPrevious}>
            <Text style={styles.control}>⏮️</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={isPlaying ? pauseTrack : resumeTrack}>
            <Text style={styles.control}>{isPlaying ? '⏸️' : '▶️'}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={playNext}>
            <Text style={styles.control}>⏭️</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={setRandomGenreQueue}>
            <Text style={styles.control}>🎲</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleAddToPlaylist}>
            <Text style={styles.control}>➕</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal pour choisir une playlist ou en créer une nouvelle */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Ajouter à une playlist</Text>

            {/* Liste des playlists existantes */}
            <FlatList
              data={userPlaylists}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleSelectPlaylist(item)}>
                  <Text style={styles.playlistItem}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />

            {/* Champ pour créer une nouvelle playlist */}
            <TextInput
              style={styles.input}
              placeholder="Nouvelle playlist"
              placeholderTextColor="#888"
              value={newPlaylistName}
              onChangeText={setNewPlaylistName}
            />

            {/* Bouton de création + ajout */}
            <TouchableOpacity onPress={handleCreateAndAdd}>
              <Text style={styles.createBtn}>Créer et ajouter</Text>
            </TouchableOpacity>

            {/* Bouton d’annulation */}
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelBtn}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: '#1DB954', padding: 10,
    flexDirection: 'row', alignItems: 'center', zIndex: 100,
  },
  image: { width: 50, height: 50, borderRadius: 6, marginRight: 10 },
  infoContainer: { flex: 1, justifyContent: 'center' },
  title: { color: 'white', fontWeight: 'bold', fontSize: 14 },
  artist: { color: 'white', fontSize: 12 },
  controls: { flexDirection: 'row', gap: 8, marginLeft: 10 },
  control: { fontSize: 20, color: 'white', marginHorizontal: 4 },

  modalContainer: { flex: 1, backgroundColor: '#000000aa', justifyContent: 'center' },
  modalContent: { backgroundColor: '#1c1c1e', margin: 20, padding: 20, borderRadius: 10 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginBottom: 10 },
  playlistItem: { color: '#fff', paddingVertical: 8, borderBottomColor: '#333', borderBottomWidth: 1 },
  input: { backgroundColor: '#2c2c2e', color: '#fff', borderRadius: 5, padding: 8, marginTop: 10 },
  createBtn: { color: '#1DB954', marginTop: 10, fontWeight: '600' },
  cancelBtn: { color: '#ccc', marginTop: 10, textAlign: 'center' },
});
