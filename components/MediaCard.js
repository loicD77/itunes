// components/MediaCard.js

import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

// Composant qui représente une carte affichant un morceau avec son image, titre et artiste
// Appelle la fonction `onPress` quand on appuie dessus
export default function MediaCard({ item, onPress }) {
  return (
    // Carte cliquable
    <TouchableOpacity style={styles.card} onPress={onPress}>

      {/* Image de l’album ou de la pochette */}
      <Image source={{ uri: item.artworkUrl100 }} style={styles.image} />

      {/* Texte : nom du morceau et artiste */}
      <View style={styles.info}>
        <Text style={styles.title}>{item.trackName}</Text>
        <Text style={styles.artist}>{item.artistName}</Text>
      </View>
    </TouchableOpacity>
  );
}

// Styles pour la MediaCard
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',       // Image à gauche, texte à droite
    margin: 10,                 // Espacement autour de la carte
    backgroundColor: '#fff',
    borderRadius: 8,            // Coins arrondis
    overflow: 'hidden',         // Coupe tout ce qui dépasse du cadre
    elevation: 2,               // Ombre pour Android
  },
  image: {
    width: 100,
    height: 100,                // Image carrée
  },
  info: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',  // Centre verticalement le texte
  },
  title: {
    fontWeight: 'bold',         // Nom du morceau en gras
  },
  artist: {
    color: 'gray',              // Artiste en gris clair
  },
});
