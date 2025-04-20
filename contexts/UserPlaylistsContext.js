import React, { createContext, useState } from 'react';
import uuid from 'react-native-uuid'; // Génère des identifiants uniques pour les playlists

// Création du contexte qui va stocker et partager les playlists utilisateur
export const UserPlaylistsContext = createContext();

// Composant fournisseur du contexte
export const UserPlaylistsProvider = ({ children }) => {
  // État global qui contient toutes les playlists créées par l’utilisateur
  const [userPlaylists, setUserPlaylists] = useState([]);

  // Fonction pour créer une nouvelle playlist vide avec un nom personnalisé
  const createPlaylist = (name) => {
    if (!name.trim()) return; // Si le nom est vide ou composé d'espaces, on annule

    const newPlaylist = {
      id: uuid.v4(),            // ID unique pour la nouvelle playlist
      name: name.trim(),        // Nom propre (sans espaces inutiles)
      tracks: [],               // La playlist est vide au départ
    };

    // On ajoute la nouvelle playlist à la liste existante
    setUserPlaylists((prev) => [...prev, newPlaylist]);
  };

  // Fonction pour ajouter un morceau à une playlist existante (sans doublon)
  const addTrackToPlaylist = (playlistId, track) => {
    if (!track || !track.trackId) return; // Vérifie que le morceau est valide

    setUserPlaylists((prev) =>
      prev.map((playlist) => {
        if (playlist.id === playlistId) {
          // Vérifie si le morceau est déjà présent
          const exists = playlist.tracks.some(t => t.trackId === track.trackId);
          if (!exists) {
            // Ajoute le morceau s’il n’est pas déjà dans la playlist
            return {
              ...playlist,
              tracks: [...playlist.tracks, track]
            };
          }
        }
        return playlist;
      })
    );
  };

  // Fournit les playlists + fonctions aux composants enfants via le contexte
  return (
    <UserPlaylistsContext.Provider value={{
      userPlaylists,         // Liste des playlists personnalisées
      createPlaylist,        // Fonction pour créer une playlist
      addTrackToPlaylist     // Fonction pour ajouter un morceau à une playlist
    }}>
      {children}
    </UserPlaylistsContext.Provider>
  );
};
