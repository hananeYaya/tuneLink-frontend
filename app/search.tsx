import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import BottomTabs from '../components/BottomTab';

interface Profile {
  id: string;
  name: string;
  region: string;
  status: string;
  image: string;
}

const profiles: Profile[] = [
  {
    id: '1',
    name: 'Nom de profil',
    region: 'Région',
    status: 'Statut sur l’app',
    image: '',
  },
  {
    id: '2',
    name: 'Nom de profil',
    region: 'Région',
    status: 'Statut sur l’app',
    image: '',
  },
  {
    id: '3',
    name: 'Nom de profil',
    region: 'Région',
    status: 'Statut sur l’app',
    image: '',
  },
  {
    id: '4',
    name: 'Nom de profil',
    region: 'Région',
    status: 'Statut sur l’app',
    image: '',
  },
  {
    id: '5',
    name: 'Nom de profil',
    region: 'Région',
    status: 'Statut sur l’app',
    image: '',
  },
];

export default function RechercherScreen() {
  const renderProfile = ({ item }: { item: Profile }) => (
    <View style={styles.profileCard}>
      <Image source={{ uri: item.image }} style={styles.profileImage} />
      <View>
        <Text style={styles.profileName}>{item.name}</Text>
        <Text style={styles.profileRegion}>{item.region}</Text>
        <Text style={styles.profileStatus}>{item.status}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Rechercher</Text>
        <View style={styles.headerIcons}>
          <Feather name="message-circle" size={24} color="white" style={styles.icon} />
          <Ionicons name="notifications-outline" size={24} color="white" />
        </View>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
        <TextInput
          placeholder="Chercher"
          placeholderTextColor="gray"
          style={styles.searchInput}
        />
      </View>

      <View style={styles.filters}>
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

      <FlatList
        data={profiles}
        renderItem={renderProfile}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <View>
        <BottomTabs />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  icon: {
    marginRight: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#1E1E1E',
    borderRadius: 25,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  searchInput: {
    flex: 1,
    color: 'white',
    paddingVertical: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  filterButton: {
    backgroundColor: '#2A2A2A',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  filterText: {
    color: 'white',
    fontSize: 12,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  profileImage: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    marginRight: 12,
  },
  profileName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  profileRegion: {
    color: 'gray',
    fontSize: 14,
  },
  profileStatus: {
    color: 'gray',
    fontSize: 12,
  },
});