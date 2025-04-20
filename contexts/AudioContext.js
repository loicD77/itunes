// contexts/AudioContext.js

import React, { createContext, useState, useRef } from 'react';

/*
  createContext : permet de créer un contexte React qu'on pourra partager dans l'app.
  useState      : sert à gérer des états réactifs (morceau actuel, file de lecture, etc.)
  useRef        : permet de conserver une référence mutable (dans ce cas, un objet Audio qu'on ne veut pas recréer à chaque rendu)
*/

import { Audio } from 'expo-av'; // "Audio" vient d'expo-av : c'est une bibliothèque Expo pour lire de l'audio
import { searchiTunes } from '../services/api'; // Fonction personnalisée pour chercher de la musique par mot-clé via iTunes

// Cette liste contient les styles de musique que je veux rendre disponibles pour la lecture aléatoire
const GENRES = [
  'drake', 'taylor swift', 'mozart', 'nirvana', 'miles davis', 'daft punk', 'bob marley', 'disco'
];

// Ce AudioContext sera utilisé pour tous les composants qui veulent accéder à l'état audio global, via useContext(AudioContext)
export const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  /*
    Ce composant :
    - Enveloppe toute l’application (dans App.js)
    - Fournit toutes les données et fonctions audio aux composants enfants
    - Utilise children pour englober tout ce qui sera "consommateur" du contexte
  */

  // Morceau actuellement en cours de lecture
  const [currentTrack, setCurrentTrack] = useState(null);

  // File d’attente des morceaux
  const [trackQueue, setTrackQueue] = useState([]);

  // Indique si un morceau est en train d’être joué
  const [isPlaying, setIsPlaying] = useState(false);

  // Informations de lecture : position, durée, etc.
  const [playbackStatus, setPlaybackStatus] = useState(null);

  // Référence à l’objet Audio.Sound, pour conserver l’état entre les re-rendus
  const soundRef = useRef(null);

  // Fonction pour lancer la lecture d’un morceau
  const playTrack = async (track) => {
    // Si le morceau n’a pas de lien audio, on sort
    if (!track?.previewUrl) return;

    // Si un son est déjà en cours, on le décharge proprement
    if (soundRef.current) {
      await soundRef.current.unloadAsync();
      soundRef.current.setOnPlaybackStatusUpdate(null);
    }

    // On crée un nouveau son à partir de l'URL et on le garde en mémoire
    const { sound } = await Audio.Sound.createAsync({ uri: track.previewUrl });  // Avec await on attend
    soundRef.current = sound;

    // Quand le statut de lecture change, on le met à jour dans l’état
    // Si le morceau se termine, on lance automatiquement le suivant
    sound.setOnPlaybackStatusUpdate((status) => {
      setPlaybackStatus(status);
      if (status.didJustFinish && !status.isLooping) {
        playNext();
      }
    });

    // Mise à jour des états et lancement de la lecture
    setCurrentTrack(track);
    setIsPlaying(true);
    await sound.playAsync();
  };

  // Fonction pour lire le morceau suivant dans la file
  const playNext = () => {
    const index = trackQueue.findIndex(t => t.trackId === currentTrack?.trackId);
    const next = trackQueue[index + 1];
    if (next) {
      playTrack(next);
    } else {
      setIsPlaying(false);
      setCurrentTrack(null);
    }
  };

  // Fonction pour lire le morceau précédent dans la file
  const playPrevious = () => {
    const index = trackQueue.findIndex(t => t.trackId === currentTrack?.trackId);
    const prev = trackQueue[index - 1];
    if (prev) playTrack(prev);
  };

  // Met la lecture en pause
  const pauseTrack = async () => {
    if (soundRef.current) {
      await soundRef.current.pauseAsync();
      setIsPlaying(false);
    }
  };

  // Reprend la lecture après une pause
  const resumeTrack = async () => {
    if (soundRef.current) {
      await soundRef.current.playAsync();
      setIsPlaying(true);
    }
  };

  // Tire un genre au hasard dans la liste, cherche des morceaux, les ajoute à la file, et lance le premier
  const setRandomGenreQueue = async () => {
    const genre = GENRES[Math.floor(Math.random() * GENRES.length)];
    const results = await searchiTunes(genre);
    if (results.length) {
      setTrackQueue(results);
      playTrack(results[0]);
    }
  };

  // Fournit le contexte audio à tous les composants enfants de l'application
  // Toutes les fonctions (lecture, pause, suivant, aléatoire, etc.) et états liés à la lecture
  // sont rendus accessibles via useContext(AudioContext) dans n'importe quel composant
  return (
    <AudioContext.Provider value={{
      currentTrack,
      isPlaying,
      playbackStatus,
      playTrack,
      pauseTrack,
      resumeTrack,
      setTrackQueue,
      trackQueue,
      playNext,
      playPrevious,
      setRandomGenreQueue,
    }}>
      {children}
    </AudioContext.Provider>
  );
};
