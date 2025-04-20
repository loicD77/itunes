// Importation des hooks React
import React, { useEffect, useState, useContext } from 'react';

// Composants React Native
import { View, FlatList, StyleSheet } from 'react-native';

// Composants personnalisés
import MediaCard from '../components/MediaCard';       // Carte d’affichage pour chaque morceau
import { searchiTunes } from '../services/api';        // Fonction de recherche iTunes
import SearchBar from '../components/searchBar';       // Barre de recherche
import { AudioContext } from '../contexts/AudioContext'; // Contexte audio global
import FakeAdBanner from '../components/FakeAdBanner'; // Publicité fictive (fun)


// Écran qui affiche les résultats de recherche iTunes
export default function ResultsScreen({ route, navigation }) {
  const [term, setTerm] = useState(route.params.term); // Terme de recherche récupéré depuis la navigation
  const [results, setResults] = useState([]);          // Résultats de recherche iTunes
  const { setTrackQueue, playTrack } = useContext(AudioContext); // Fonctions pour gérer la lecture

  // useEffect pour effectuer la recherche dès que le terme change
  useEffect(() => {
    const fetchResults = async () => {
      const data = await searchiTunes(term); // Appel API
      setResults(data);                     // Mise à jour de l’état local avec les résultats

      // Si des morceaux sont trouvés, on prépare la file de lecture et on joue le 1er
      if (data.length > 0) {
        setTrackQueue(data);                // On met tous les résultats dans la file
        playTrack(data[0]);                 // On lance automatiquement le premier
      }
    };

    fetchResults(); // Appel immédiat
  }, [term]); // Dépendance : relancer si `term` change

  return (
    <View style={styles.container}>
      {/* Barre de recherche en haut */}
      <SearchBar
        term={term}
        onChangeTerm={setTerm}
        onSubmit={() => {}} // pas besoin ici, on utilise useEffect
      />

      {/* Liste des morceaux avec FlatList */}
      <FlatList
        data={results} // les résultats à afficher
        keyExtractor={(item) => item.trackId?.toString()} // Clé unique obligatoire
        renderItem={({ item }) => (
          <MediaCard
            item={item}
            onPress={() => navigation.navigate('Detail', { item })}
          />
        )}
        ListFooterComponent={<FakeAdBanner />} // Pub fun tout en bas
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0c10', // Fond sombre (Spotify style)
    paddingTop: 10,
  },
});
