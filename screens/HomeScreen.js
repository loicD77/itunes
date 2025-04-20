// Importations nécessaires
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Button
} from 'react-native';

// Composants personnalisés
import SearchBar from '../components/searchBar';      // Champ de recherche
import FakeAdBanner from '../components/FakeAdBanner'; // Bannière pub humoristique

// Composant principal de l’écran d’accueil
export default function HomeScreen({ navigation }) {
  // État local pour stocker le mot-clé de recherche
  const [term, setTerm] = useState('');

  // Fonction appelée quand on soumet la recherche
  const handleSearch = () => {
    if (term.trim()) {
      navigation.navigate('Results', { term }); // Redirige vers la page de résultats
    }
  };

  // Interface de la page
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logo Lozic */}
      <Image source={require('../assets/logo.png')} style={styles.logo} />

      {/* Titre et slogan */}
      <Text style={styles.title}>Lozic</Text>
      <Text style={styles.slogan}>C'est magic ✨</Text>

      {/* Barre de recherche iTunes */}
      <SearchBar
        term={term}
        onChangeTerm={setTerm}
        onSubmit={handleSearch}
      />

      {/* Publicité fictive */}
      <FakeAdBanner />

      {/* Bloc d’artistes tendances */}
      <View style={styles.topArtists}>
        <Text style={styles.sectionTitle}>🔥 Top artistes cette semaine</Text>
        <View style={styles.artistRow}>
          <Text style={styles.rank}>1.</Text>
          <Text style={styles.artistText}>Lil Byte</Text>
        </View>
        <View style={styles.artistRow}>
          <Text style={styles.rank}>2.</Text>
          <Text style={styles.artistText}>DJ JSon</Text>
        </View>
        <View style={styles.artistRow}>
          <Text style={styles.rank}>3.</Text>
          <Text style={styles.artistText}>Codezilla</Text>
        </View>
      </View>

      {/* Boutons de navigation */}
      <Button
        title="Voir les playlists 🎶"
        onPress={() => navigation.navigate('Playlists')}
      />
      <Button
        title="🎶 Explorer par genre"
        onPress={() => navigation.navigate('Genres')}
      />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    alignItems: 'center',
    backgroundColor: '#0b0c10', // Fond sombre
    paddingBottom: 100,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
    shadowColor: '#1DB954',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 6,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1DB954', // Vert Spotify
    textShadowColor: '#1DB954',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    marginTop: 5,
  },
  slogan: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#AAAAAA',
    marginBottom: 30,
  },
  topArtists: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#1f1f1f',
    borderRadius: 10,
    width: '90%',
  },
  sectionTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  artistRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  rank: {
    color: '#1DB954',
    fontWeight: 'bold',
    marginRight: 10,
    fontSize: 16,
  },
  artistText: {
    color: '#ccc',
    fontSize: 16,
  },
});
