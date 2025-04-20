// components/FakeAdBanner.js

import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

// Composant qui affiche une fausse bannière publicitaire humoristique
export default function FakeAdBanner() {

  // Liste des publicités fictives avec titre, description et image
  const ads = [
    {
      title: "🎧 Casques BOOMZ",
      description: "Un son si pur que même Mozart danserait.",
      image: require('../assets/headphone.jpg'), // Assure-toi que l'image est bien présente dans /assets
    },
    {
      title: "💎 Lozic Premium",
      description: "Écoute en illimité pour 0,00€… mais chut 🤫",
      image: require('../assets/premium.jpg'),
    },
    {
      title: "🔥 Nouveau : LozicFit",
      description: "Fais des squats en écoutant du disco 💃",
      image: require('../assets/fitness.jpg'),
    }
  ];

  // Sélectionne une publicité aléatoire à chaque affichage
  const randomAd = ads[Math.floor(Math.random() * ads.length)];

  return (
    <View style={styles.container}>
      {/* Image de la pub sélectionnée */}
      <Image source={randomAd.image} style={styles.image} />

      {/* Texte de la pub : titre + description */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{randomAd.title}</Text>
        <Text style={styles.description}>{randomAd.description}</Text>
      </View>
    </View>
  );
}

// Styles pour le composant FakeAdBanner
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',         // Affiche image + texte côte à côte
    backgroundColor: '#1e1e1e',   // Fond sombre
    padding: 10,
    borderRadius: 10,
    margin: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,                 // Ombre pour Android
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 6,
    marginRight: 15,              // Espace entre image et texte
  },
  textContainer: {
    flexShrink: 1,                // Permet au texte de ne pas déborder
  },
  title: {
    fontWeight: 'bold',
    color: '#1DB954',             // Vert typique de Spotify
    fontSize: 16,
  },
  description: {
    color: '#fff',
    fontSize: 13,
    marginTop: 4,
  },
});
