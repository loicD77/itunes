// components/PlaylistCard.js

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

// Composant qui représente une carte de playlist (image + titre + description)
// Clic sur la carte = déclenche la fonction onPress (ex. : navigation vers la playlist)
export default function PlaylistCard({ playlist, onPress }) {
  return (
    // La carte entière est cliquable grâce à TouchableOpacity
    <TouchableOpacity onPress={onPress} style={styles.card}>
      
      {/* Image représentative de la playlist (ex: pochette, visuel thématique) */}
      <Image source={playlist.image} style={styles.image} />

      {/* Zone texte : titre et description de la playlist */}
      <View style={styles.info}>
        <Text style={styles.title}>{playlist.title}</Text>
        <Text style={styles.desc}>{playlist.description}</Text>
      </View>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1f1f1f',    // Fond sombre pour un effet Spotify
    marginVertical: 10,           // Espace haut et bas entre les cartes
    borderRadius: 12,             // Coins arrondis
    flexDirection: 'row',         // Image à gauche, texte à droite
    padding: 10,
    alignItems: 'center',         // Aligne verticalement image et texte
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,              // Coins arrondis pour l’image
    marginRight: 12,              // Espace entre l’image et les textes
  },
  info: {
    flex: 1,                      // Prend tout l’espace restant pour les textes
  },
  title: {
    color: '#fff',                // Texte blanc pour contraste
    fontSize: 18,
    fontWeight: 'bold',
  },
  desc: {
    color: '#aaa',                // Texte gris plus clair pour description
    fontSize: 14,
  },
});
