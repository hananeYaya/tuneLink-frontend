import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import BottomTabs from '../components/BottomTab';

// Interfaces pour les types de données
interface EventItem {
  id: string;
  title: string;
  location: string;
  date: string;
  time: string;
  image?: string;
}

interface MusicianItem {
  id: string;
  name: string;
  instrument: string;
  genre: string;
  image?: string;
}

// Données pour les événements à venir
const upcomingEvents: EventItem[] = [
  {
    id: '1',
    title: 'Jam Session Jazz',
    location: 'Le Studio, Paris',
    date: '11 Avril 2025',
    time: '20:00',
    image: ''
  },
  {
    id: '2',
    title: 'Concert Blues',
    location: 'Le Blues Bar, Lyon',
    date: '15 Avril 2025',
    time: '21:30',
    image: ''
  },
  {
    id: '3',
    title: 'Open Mic Night',
    location: 'Café des Artistes, Bordeaux',
    date: '18 Avril 2025',
    time: '19:00',
    image: ''
  }
];

// Données pour les musiciens suggérés
const suggestedMusicians: MusicianItem[] = [
  {
    id: '1',
    name: 'Michel Dupont',
    instrument: 'Guitare',
    genre: 'Jazz, Blues',
    image: '',
  },
  {
    id: '2',
    name: 'Sophie Martin',
    instrument: 'Piano',
    genre: 'Classique, Jazz',
    image: '',
  },
  {
    id: '3',
    name: 'Thomas Durand',
    instrument: 'Batterie',
    genre: 'Rock, Pop',
    image: '',
  },
  {
    id: '4',
    name: 'Emma Petit',
    instrument: 'Violon',
    genre: 'Classique, Folk',
    image: '',
  }
];

export default function HomeScreen() {
  const router = useRouter();

  const renderEvent = ({ item }: { item: EventItem }) => (
    <TouchableOpacity style={styles.eventCard}>
      <View style={styles.eventImageContainer}>
        <Image 
          source={item.image ? { uri: item.image } : require('../assets/event-placeholder.png')} 
          style={styles.eventImage} 
        />
      </View>
      <View style={styles.eventInfo}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <View style={styles.eventDetails}>
          <Ionicons name="location-outline" size={14} color="#999" />
          <Text style={styles.eventLocation}>{item.location}</Text>
        </View>
        <View style={styles.eventDetails}>
          <Ionicons name="calendar-outline" size={14} color="#999" />
          <Text style={styles.eventDate}>{item.date} - {item.time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderMusician = ({ item }: { item: MusicianItem }) => (
    <TouchableOpacity style={styles.musicianCard}>
      <Image 
        source={item.image ? { uri: item.image } : require('../assets/profileImage.png')} 
        style={styles.musicianImage} 
      />
      <Text style={styles.musicianName}>{item.name}</Text>
      <Text style={styles.musicianDetails}>{item.instrument}</Text>
      <Text style={styles.musicianGenre}>{item.genre}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Musicians Network</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => router.push('/receiver')}>
            <Feather name="message-circle" size={24} color="white" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/notifications')}>
            <Ionicons name="notifications-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
  
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 100}}>
        {/* Section Bienvenue */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Bienvenue dans votre</Text>
          <Text style={styles.welcomeTextHighlight}>réseau de musiciens</Text>
          <Text style={styles.welcomeDescription}>
            Connectez-vous avec d'autres musiciens, participez à des événements 
            et trouvez des opportunités de collaboration musicale.
          </Text>
        </View>
  
        {/* Section Événements à venir */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Événements à venir</Text>
          <FlatList
            data={upcomingEvents}
            renderItem={renderEvent}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.eventsList}
          />
        </View>
  
        {/* Section Musiciens suggérés */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Musiciens suggérés</Text>
          <FlatList
            data={suggestedMusicians}
            renderItem={renderMusician}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.musiciansList}
          />
        </View>
      </ScrollView>
  
      <BottomTabs />
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
    marginBottom: 15,
  },
  headerTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  icon: {
    marginRight: 20,
  },
  welcomeSection: {
    marginVertical: 20,
  },
  welcomeText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '500',
  },
  welcomeTextHighlight: {
    color: '#0084FF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  welcomeDescription: {
    color: '#999',
    fontSize: 14,
    lineHeight: 20,
  },
  sectionContainer: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAllText: {
    color: '#0084FF',
    fontSize: 14,
  },
  eventsList: {
    paddingRight: 20,
  },
  eventCard: {
    backgroundColor: '#1C1C1E',
    borderRadius: 10,
    width: 280,
    marginRight: 15,
    overflow: 'hidden',
  },
  eventImageContainer: {
    height: 130,
    backgroundColor: '#333',
  },
  eventImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  eventInfo: {
    padding: 12,
  },
  eventTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  eventDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  eventLocation: {
    color: '#999',
    fontSize: 12,
    marginLeft: 4,
  },
  eventDate: {
    color: '#999',
    fontSize: 12,
    marginLeft: 4,
  },
  musiciansList: {
    paddingRight: 20,
  },
  musicianCard: {
    backgroundColor: '#1C1C1E',
    borderRadius: 10,
    padding: 15,
    width: 150,
    marginRight: 15,
    alignItems: 'center',
  },
  musicianImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    backgroundColor: '#333',
  },
  musicianName: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  musicianDetails: {
    color: '#999',
    fontSize: 12,
    textAlign: 'center',
  },
  musicianGenre: {
    color: '#0084FF',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 4,
  },
  ctaContainer: {
    backgroundColor: '#1C1C1E',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    alignItems: 'center',
  },
  ctaTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  ctaDescription: {
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 20,
  },
  ctaButton: {
    backgroundColor: '#0084FF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  ctaButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  section: {
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 15,
  }
});