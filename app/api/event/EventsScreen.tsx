import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import BottomTabs from '../../../components/BottomTab';
import EventBanner from '../../../components/EventBanner';

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
      <EventBanner
  imageUri={require('@/assets/event-banner-upcoming.jpg')}
  title="Événements à venir"
  onPress={() => router.push('/api/event/UpcomingEventsScreen')}
/>

<EventBanner
  imageUri={require('@/assets/event-banner-create.jpeg')}
  title="Mes événement"
  onPress={() => router.push('/api/event/MyEventsScreen')}
/>
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
});