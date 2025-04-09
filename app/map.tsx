import React, { useState, useEffect } from 'react';
import { Platform, View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import * as Device from 'expo-device';
import MapView, { Marker } from 'react-native-maps';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LocationObject } from 'expo-location';

// Remplacer le style de carte sombre par un style clair
// En retirant complètement le customMapStyle, la carte utilisera son style clair par défaut

export default function MusicianMapScreen() {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [nearbyMusicians, setNearbyMusicians] = useState([
    {
      id: 'musician1',
      name: 'Tony Parker',
      coordinate: { 
        latitude: 48.92, 
        longitude: 2.37
      },
      genre: 'Jazz'
    },
    {
      id: 'musician2',
      name: 'Halle Tony Garnier',
      coordinate: { 
        latitude: 48.93, 
        longitude: 2.35
      },
      genre: 'Classique'
    }
  ]);
  
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android' && !Device.isDevice) {
        setErrorMsg('Cette fonctionnalité ne fonctionne pas sur un émulateur Android.');
        return;
      }
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission d\'accès à la localisation refusée');
        return;
      }
      
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          // Retrait de customMapStyle pour avoir une carte en couleur claire
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
          {/* Marqueur de l'utilisateur */}
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            pinColor="#007bff"
            title="Vous êtes ici"
          />
          
          {/* Marqueurs des musiciens à proximité */}
          {nearbyMusicians.map((musician) => (
            <Marker
              key={musician.id}
              coordinate={musician.coordinate}
              title={musician.name}
              description={musician.genre}
            />
          ))}
        </MapView>
      ) : (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>
            {errorMsg || 'Chargement de la carte...'}
          </Text>
        </View>
      )}
      
      {/* Header avec barre de recherche centrée */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <AntDesign name="search1" size={20} color="#aaa" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Chercher un musicien"
            placeholderTextColor="#aaa"
          />
        </View>
      </View>
      
      {/* Filtres */}
      <View style={styles.filtersContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Genre musical</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Localisation</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Niveau</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Centrer le contenu
    paddingTop: 50,
    paddingHorizontal: 15,
    paddingBottom: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 20,
    paddingHorizontal: 15,
    maxWidth: '90%', // Limiter la largeur pour ne pas occuper tout l'écran
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#fff',
  },
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingBottom: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  filterButton: {
    backgroundColor: '#2a2a2a',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  filterText: {
    color: '#fff',
    fontSize: 12,
  }
});