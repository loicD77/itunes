// components/MediaPlayer.js

import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { AudioContext } from '../contexts/AudioContext'; // On importe le contexte audio

// Composant qui affiche le mini-lecteur audio avec pochette, bouton pause/play, et barre de progression
export default function MediaPlayer({ artworkUrl }) {

  // On récupère les données/fonctions du contexte AudioContext
  const {
    currentTrack,       // Le morceau en cours
    isPlaying,          // Booléen : est-ce que ça joue ?
    pauseTrack,         // Fonction pour mettre en pause
    resumeTrack,        // Fonction pour relancer la lecture
    playbackStatus      // Informations sur la lecture (position, durée, etc.)
  } = useContext(AudioContext);

  // Position actuelle du morceau en millisecondes
  const progress = playbackStatus?.positionMillis || 0;

  // Durée totale du morceau (par défaut 1 pour éviter une division par zéro)
  const duration = playbackStatus?.durationMillis || 1;

  // Fonction utilitaire pour formater des millisecondes en mm:ss
  const format = (ms) => {
    const s = Math.floor(ms / 1000);
    return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      
      {/* Affiche la pochette du morceau si elle est disponible */}
      {artworkUrl && <Image source={{ uri: artworkUrl }} style={styles.artwork} />}
      
      {/* Affiche le temps actuel et la durée totale */}
      <Text style={styles.time}>{format(progress)} / {format(duration)}</Text>

      {/* Barre de progression */}
      <View style={styles.bar}>
        <View style={[styles.progress, { width: `${(progress / duration) * 100}%` }]} />
      </View>

      {/* Bouton lecture/pause selon l'état isPlaying */}
      <TouchableOpacity onPress={isPlaying ? pauseTrack : resumeTrack}>
        <Text style={styles.button}>{isPlaying ? '⏸️ Pause' : '▶️ Lire'}</Text>
      </TouchableOpacity>

    </View>
  );
}

// Styles du lecteur audio
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20
  },
  artwork: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10
  },
  time: {
    color: '#fff',
    marginBottom: 4
  },
  bar: {
    width: '80%',
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 2,
    marginBottom: 10
  },
  progress: {
    height: 4,
    backgroundColor: '#1DB954',
    borderRadius: 2
  },
  button: {
    color: '#1DB954',
    fontWeight: 'bold',
    fontSize: 16
  },
});
