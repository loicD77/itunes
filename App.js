// App.js

// Import de React
import React from 'react';

// Navigation (React Navigation)
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Composants natifs de React Native
import { Image, TouchableOpacity } from 'react-native';

// Import des écrans (pages principales de l’application)
import HomeScreen from './screens/HomeScreen';
import ResultsScreen from './screens/resultsScreen';
import DetailScreen from './screens/DetailScreen';
import GenresScreen from './screens/GenresScreen';
import PlaylistsScreen from './screens/PlaylistsScreen';
import MyPlaylistsScreen from './screens/MyPlaylistsScreen';
import CreatePlaylistScreen from './screens/CreatePlaylistScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import UserPlaylistDetailScreen from './screens/UserPlaylistDetailScreen';

// Import des providers contextuels (pour partager les données globales comme l’audio ou les playlists personnalisées)
import { AudioProvider } from './contexts/AudioContext';
import { UserPlaylistsProvider } from './contexts/UserPlaylistsContext';

// Import du mini-lecteur de musique
import MiniPlayer from './components/MiniPlayer';

// Création du "Stack Navigator" (navigation par pile)
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // Fournisseur global pour la gestion de l'audio (AudioContext)
    <AudioProvider>
      {/* Fournisseur global pour les playlists de l'utilisateur */}
      <UserPlaylistsProvider>

        {/* Conteneur principal pour la navigation */}
        <NavigationContainer>

          {/* Stack Navigator avec les écrans de l'app */}
          <Stack.Navigator
            initialRouteName="Home" // L'écran de démarrage est "Home"
            screenOptions={({ navigation }) => ({
              headerTitle: '', // Pas de titre dans l'en-tête
              headerStyle: { backgroundColor: '#0b0c10' }, // Couleur personnalisée de l'en-tête
              
              // Logo cliquable à gauche de l'en-tête, qui ramène à la page d'accueil
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                  <Image
                    source={require('./assets/logo.png')}
                    style={{
                      width: 100,
                      height: 100,
                      marginLeft: 15,
                      resizeMode: 'contain',
                    }}
                  />
                </TouchableOpacity>
              ),
            })}
          >
            {/* Déclaration des différents écrans disponibles dans l'app */}
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Results" component={ResultsScreen} />
            <Stack.Screen name="Detail" component={DetailScreen} />
            <Stack.Screen name="Genres" component={GenresScreen} />
            <Stack.Screen name="Playlists" component={PlaylistsScreen} />
            <Stack.Screen name="MyPlaylists" component={MyPlaylistsScreen} />
            <Stack.Screen name="CreatePlaylist" component={CreatePlaylistScreen} />
            <Stack.Screen name="UserPlaylistDetail" component={UserPlaylistDetailScreen} />

            {/* Login et Register ont leur header visible */}
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: true }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: true }}
            />
          </Stack.Navigator>

          {/* MiniPlayer visible en permanence en bas de l'app */}
          <MiniPlayer />
        </NavigationContainer>
      </UserPlaylistsProvider>
    </AudioProvider>
  );
}
