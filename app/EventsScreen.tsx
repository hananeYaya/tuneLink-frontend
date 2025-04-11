import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import BottomTabs from '../components/BottomTab';

export default function EventsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Événements</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => router.push('/receiver')}>
            <Feather name="message-circle" size={24} color="white" style={styles.icon} />
          </TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="white" />
        </View>
      </View>

      <View style={styles.eventContainer}>
        <TouchableOpacity 
          style={styles.eventBanner}
          onPress={() => router.push('/UpcomingEventsScreen')}
        >
          <Image 
            source={require('../assets/event-banner-upcoming.jpg')} 
            style={styles.eventBannerImage} 
          />
          <View style={styles.eventBannerTextContainer}>
            <Text style={styles.eventBannerTitle}>Mes événements à venir</Text>
            <Text style={styles.eventBannerDescription}>Consultez vos événements programmés</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.eventBanner}
          onPress={() => router.push('/CreateEventScreen')}
        >
          <Image 
            source={require('../assets/event-banner-create.jpeg')} 
            style={styles.eventBannerImage} 
          />
          <View style={styles.eventBannerTextContainer}>
            <Text style={styles.eventBannerTitle}>Organiser un événement</Text>
            <Text style={styles.eventBannerDescription}>Créez et partagez votre propre événement</Text>
          </View>
        </TouchableOpacity>
      </View>

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
  eventContainer: {
    marginTop: 20,
  },
  eventBanner: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  eventBannerImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  eventBannerTextContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
  },
  eventBannerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  eventBannerDescription: {
    color: 'white',
    fontSize: 14,
    opacity: 0.8,
  }
});