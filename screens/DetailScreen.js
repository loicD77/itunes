// Importations de base
import React, { useContext, useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, FlatList, Alert
} from 'react-native';

// Composants et contextes utilisés
import MediaPlayer from '../components/mediaPlayer';
import { AudioContext } from '../contexts/AudioContext';
import { UserPlaylistsContext } from '../contexts/UserPlaylistsContext';
import FakeAdBanner from '../components/FakeAdBanner';

// Écran de détails d’un morceau (titre, artiste, collection, audio, playlist)
export default function DetailScreen({ route }) {
  const { item } = route.params; // Récupère les données du morceau passées depuis un autre écran

  // Contexte audio (lecture)
  const { playTrack, setTrackQueue } = useContext(AudioContext);

  // Contexte des playlists utilisateur
  const { userPlaylists, createPlaylist, addTrackToPlaylist } = useContext(UserPlaylistsContext);

  // États locaux pour gérer le modal
  const [modalVisible, setModalVisible] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [createdPlaylistName, setCreatedPlaylistName] = useState('');

  // Fonction : jouer le morceau dans le MiniPlayer
  const handlePlay = () => {
    setTrackQueue([item]); // met la file avec juste ce morceau
    playTrack(item);
  };

  // Ouvre le modal de sélection/ajout de playlist
  const handleAddToPlaylist = () => {
    setModalVisible(true);
  };

  // Ajouter le morceau à une playlist existante
  const handleSelectPlaylist = (playlist) => {
    addTrackToPlaylist(playlist.id, item);
    Alert.alert("✅ Ajouté", `Ajouté à la playlist "${playlist.name}"`);
    setModalVisible(false);
  };

  // Crée une nouvelle playlist puis prépare à y ajouter le morceau
  const handleCreateAndAdd = () => {
    if (newPlaylistName.trim()) {
      createPlaylist(newPlaylistName.trim());
      setCreatedPlaylistName(newPlaylistName.trim()); // Utilisé dans le useEffect
      setNewPlaylistName('');
    }
  };

  // Dès que la playlist est créée (donc visible dans userPlaylists), on ajoute le morceau dedans
  useEffect(() => {
    if (createdPlaylistName) {
      const found = userPlaylists.find(p => p.name === createdPlaylistName);
      if (found) {
        addTrackToPlaylist(found.id, item);
        Alert.alert("🎶 Ajouté", `Ajouté à la nouvelle playlist "${found.name}"`);
        setModalVisible(false);
        setCreatedPlaylistName('');
      }
    }
  }, [userPlaylists]); // Cette logique se relance à chaque mise à jour des playlists

  return (
    <View style={styles.container}>
      {/* Affichage des infos principales */}
      <Text style={styles.title}>{item.trackName}</Text>
      <Text style={styles.artist}>{item.artistName}</Text>
      <Text style={styles.collection}>{item.collectionName}</Text>

      {/* Mini lecteur audio */}
      <MediaPlayer artworkUrl={item.artworkUrl100} />

      {/* Bouton lecture */}
      <TouchableOpacity onPress={handlePlay}>
        <Text style={styles.play}>▶️ Lire dans MiniPlayer</Text>
      </TouchableOpacity>

      {/* Bouton ajout à une playlist */}
      <TouchableOpacity onPress={handleAddToPlaylist}>
        <Text style={styles.add}>➕ Ajouter à une playlist</Text>
      </TouchableOpacity>

      {/* Modal d’ajout / création de playlist */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Ajouter à une playlist</Text>

            {/* Liste des playlists perso */}
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
            <TouchableOpacity onPress={handleCreateAndAdd}>
              <Text style={styles.createBtn}>Créer et ajouter</Text>
            </TouchableOpacity>

            {/* Bouton pour fermer le modal */}
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelBtn}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Publicité fake (fun et stylée) */}
      <FakeAdBanner />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#0b0c10',
    flex: 1,
  },
  title: {
    fontSize: 24,
    color: '#1DB954',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  artist: {
    color: '#aaa',
    marginBottom: 5,
  },
  collection: {
    color: '#888',
    marginBottom: 15,
  },
  play: {
    marginTop: 15,
    color: '#1DB954',
    fontWeight: '600',
    fontSize: 16,
  },
  add: {
    marginTop: 10,
    color: '#ffffff',
    fontSize: 15,
    fontStyle: 'italic',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#1c1c1e',
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  playlistItem: {
    color: '#fff',
    paddingVertical: 8,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
  input: {
    backgroundColor: '#2c2c2e',
    color: '#fff',
    borderRadius: 5,
    padding: 8,
    marginTop: 10,
  },
  createBtn: {
    color: '#1DB954',
    marginTop: 10,
    fontWeight: '600',
  },
  cancelBtn: {
    color: '#ccc',
    marginTop: 10,
    textAlign: 'center',
  },
});
