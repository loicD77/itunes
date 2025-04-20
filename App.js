// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, TouchableOpacity } from 'react-native';

// Screens
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

// Contexts & Components
import { AudioProvider } from './contexts/AudioContext';
import { UserPlaylistsProvider } from './contexts/UserPlaylistsContext';
import MiniPlayer from './components/MiniPlayer';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AudioProvider>
      <UserPlaylistsProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={({ navigation }) => ({
              headerTitle: '',
              headerStyle: { backgroundColor: '#0b0c10' },
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
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Results" component={ResultsScreen} />
            <Stack.Screen name="Detail" component={DetailScreen} />
            <Stack.Screen name="Genres" component={GenresScreen} />
            <Stack.Screen name="Playlists" component={PlaylistsScreen} />
            <Stack.Screen name="MyPlaylists" component={MyPlaylistsScreen} />
            <Stack.Screen name="CreatePlaylist" component={CreatePlaylistScreen} />
            <Stack.Screen name="UserPlaylistDetail" component={UserPlaylistDetailScreen} />

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
          <MiniPlayer />
        </NavigationContainer>
      </UserPlaylistsProvider>
    </AudioProvider>
  );
}
