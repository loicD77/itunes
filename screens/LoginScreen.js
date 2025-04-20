// Importation de React
import React from 'react';

// Composants de base de React Native
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

// Composant d’écran : ici, c’est l’écran de connexion (Login)
export default function LoginScreen() {
  return (
    <View style={styles.container}>
      {/* Message affiché au centre de l’écran */}
      <Text style={styles.text}>Bienvenue sur l'écran de connexion</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,                         // Prend tout l’écran
    backgroundColor: '#0b0c10',      // Fond noir/bleu foncé
    justifyContent: 'center',        // Centre verticalement
    alignItems: 'center',            // Centre horizontalement
  },
  text: {
    color: '#fff',                   // Texte blanc
    fontSize: 20,                    // Taille moyenne
  },
});
