import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

// Composant SearchBar : zone de recherche simple avec champ de texte
// Props :
// - term         : la valeur actuelle du champ de recherche
// - onChangeTerm : fonction appelée à chaque frappe (mise à jour du champ)
// - onSubmit     : fonction appelée lors de la validation (entrée/clavier)
export default function SearchBar({ term, onChangeTerm, onSubmit }) {
  return (
    <View style={styles.container}>
      {/* Champ de saisie pour la recherche */}
      <TextInput
        style={styles.input}
        placeholder="Rechercher sur iTunes..."   // Texte d’exemple grisé
        value={term}                            // Valeur liée à l’état externe
        onChangeText={onChangeTerm}             // Mise à jour en temps réel
        onSubmitEditing={onSubmit}              // Appui sur "entrée" ou "rechercher"
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
  },
});
