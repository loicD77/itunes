// components/PlaylistPickerModal.js

import React, { useState } from 'react';
import {
  View, Text, Modal, TextInput, TouchableOpacity, FlatList, StyleSheet
} from 'react-native';

// Composant modal qui permet à l'utilisateur de choisir une playlist existante
// ou d'en créer une nouvelle pour y ajouter un morceau
export default function PlaylistPickerModal({
  visible,     // booléen : affiche ou cache le modal
  onClose,     // fonction à appeler pour fermer le modal
  playlists,   // liste des playlists existantes (array d'objets)
  onSelect,    // fonction appelée quand une playlist est sélectionnée
  onCreate     // fonction appelée pour créer une nouvelle playlist
}) {
  // État local pour stocker le nom d'une nouvelle playlist
  const [newName, setNewName] = useState('');

  return (
    <Modal visible={visible} transparent animationType="slide">
      {/* Overlay semi-transparent derrière le modal */}
      <View style={styles.overlay}>
        {/* Contenu du modal */}
        <View style={styles.modalContent}>
          <Text style={styles.title}>🎵 Ajouter à une playlist</Text>

          {/* Liste des playlists existantes */}
          <FlatList
            data={playlists}
            keyExtractor={(p) => p.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  onSelect(item.id);  // Sélectionne la playlist
                  onClose();          // Ferme le modal
                }}
              >
                <Text style={styles.item}>📂 {item.name}</Text>
              </TouchableOpacity>
            )}
          />

          {/* Création d'une nouvelle playlist */}
          <Text style={styles.subtitle}>Nouvelle playlist :</Text>

          {/* Champ de saisie pour le nom de la playlist */}
          <TextInput
            style={styles.input}
            value={newName}
            placeholder="Nom de la playlist"
            onChangeText={setNewName}
          />

          {/* Bouton "Créer et ajouter" */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (newName.trim()) {
                onCreate(newName);   // Crée la playlist
                setNewName('');      // Réinitialise le champ
                onClose();           // Ferme le modal
              }
            }}
          >
            <Text style={styles.buttonText}>Créer et ajouter</Text>
          </TouchableOpacity>

          {/* Bouton pour fermer sans rien faire */}
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.close}>Fermer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  // Fond sombre semi-transparent derrière le modal
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000099' // noir avec opacité
  },
  // Boîte centrale du modal
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    width: '80%',
    borderRadius: 10
  },
  // Titre principal du modal
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  // Élément de la liste (nom de playlist)
  item: {
    fontSize: 16,
    paddingVertical: 8
  },
  // Sous-titre pour la section de création
  subtitle: {
    marginTop: 10,
    fontWeight: 'bold'
  },
  // Champ texte pour saisir le nom de la nouvelle playlist
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    marginTop: 5,
    marginBottom: 10
  },
  // Bouton de création
  button: {
    backgroundColor: '#1DB954',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center'
  },
  // Texte du bouton de création
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  // Bouton "Fermer"
  close: {
    marginTop: 10,
    color: '#1DB954',
    textAlign: 'center'
  }
});
