// Importation de React
import React from 'react';

// Composants de base de React Native
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

// Composant fonctionnel de l’écran d’inscription (Register)
export default function RegisterScreen() {
  return (
    <View style={styles.container}>
      {/* Texte affiché au centre de l’écran */}
      <Text style={styles.text}>Page d'inscription</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,                           // Le composant prend tout l’écran
    backgroundColor: '#0b0c10',        // Fond sombre
    justifyContent: 'center',          // Centre le contenu verticalement
    alignItems: 'center',              // Centre le contenu horizontalement
  },
  text: {
    color: '#fff',                     // Texte blanc
    fontSize: 20,                      // Taille du texte
  },
});
