// Import de React et des hooks nécessaires
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

// Import du contexte des playlists utilisateur
import { UserPlaylistsContext } from '../contexts/UserPlaylistsContext';

// Composant d’écran pour créer une playlist
export default function CreatePlaylistScreen({ navigation }) {
  // État local pour stocker le nom saisi par l’utilisateur
  const [name, setName] = useState('');

  // On récupère la fonction createPlaylist depuis le contexte global
  const { createPlaylist } = useContext(UserPlaylistsContext);

  // Fonction appelée quand l’utilisateur appuie sur "Créer"
  const handleCreate = () => {
    // Vérifie que le nom n’est pas vide ou composé seulement d’espaces
    if (!name.trim()) {
      Alert.alert("Erreur", "Le nom de la playlist ne peut pas être vide");
      return;
    }

    // Crée la playlist via le contexte global
    createPlaylist(name);

    // Redirige l’utilisateur vers l’écran "Mes playlists"
    navigation.navigate('MyPlaylists');
  };

  // Interface utilisateur de l’écran
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nom de la playlist</Text>

      {/* Champ de saisie du nom */}
      <TextInput
        value={name}                      // Valeur actuelle
        onChangeText={setName}            // Mise à jour à chaque frappe
        placeholder="Ma playlist chill"   // Texte d’exemple
        style={styles.input}              // Style du champ
      />

      {/* Bouton pour déclencher la création */}
      <Button
        title="Créer la playlist"
        onPress={handleCreate}
        color="#1DB954" // Couleur verte style Spotify
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0b0c10', // Fond sombre
    flex: 1,                    // Prend toute la hauteur de l’écran
    padding: 20,                // Marge intérieure
  },
  label: {
    color: '#fff',              // Texte blanc
    marginBottom: 10,
    fontSize: 18,
  },
  input: {
    backgroundColor: '#fff',    // Champ blanc
    padding: 10,
    borderRadius: 6,            // Coins arrondis
    marginBottom: 20,
  },
});
