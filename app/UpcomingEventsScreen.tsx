import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import BottomTabs from '../components/BottomTab';

// Interface for Event
interface Event {
  id: string;
  name: string;
  ville: string;
  heure: string;
  region: string;
}

// Mock events data
const events: { date: string, eventList: Event[] }[] = [
  {
    date: 'Vendredi 11 avril 2025',
    eventList: [
      {
        id: '1',
        name: 'Nom de l\'événement',
        ville: 'Ville',
        heure: 'Heure de début de l\'événement',
        region: 'Nom de la région'
      },
      {
        id: '2',
        name: 'Nom de l\'événement',
        ville: 'Ville',
        heure: 'Heure de début de l\'événement',
        region: 'Nom de la région'
      }
    ]
  },
  {
    date: 'Samedi 12 avril 2025',
    eventList: [
      {
        id: '3',
        name: 'Nom de l\'événement',
        ville: 'Ville',
        heure: 'Heure de début de l\'événement',
        region: 'Nom de la région'
      }
    ]
  }
];

export default function UpcomingEventsScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<'date' | 'region'>('date');

  const renderEventItem = ({ item }: { item: Event }) => (
    <View style={styles.eventCard}>
      <View style={styles.eventCardContent}>
        <Text style={styles.eventName}>{item.name}</Text>
        <View style={styles.eventDetailRow}>
          <Ionicons name="location-outline" size={14} color="#999" />
          <Text style={styles.eventDetailText}>{item.ville}</Text>
        </View>
        <View style={styles.eventDetailRow}>
          <Ionicons name="time-outline" size={14} color="#999" />
          <Text style={styles.eventDetailText}>{item.heure}</Text>
        </View>
        <Text style={styles.eventRegion}>{item.region}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Mes événements à venir</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => router.push('/receiver')}>
            <Feather name="message-circle" size={24} color="white" style={styles.icon} />
          </TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="white" />
        </View>
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity 
          style={[
            styles.filterButton, 
            activeFilter === 'date' && styles.activeFilterButton
          ]}
          onPress={() => setActiveFilter('date')}
        >
          <Text style={[
            styles.filterButtonText, 
            activeFilter === 'date' && styles.activeFilterButtonText
          ]}>Par date</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.filterButton, 
            activeFilter === 'region' && styles.activeFilterButton
          ]}
          onPress={() => setActiveFilter('region')}
        >
          <Text style={[
            styles.filterButtonText, 
            activeFilter === 'region' && styles.activeFilterButtonText
          ]}>Par région</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={events.flatMap(group => group.eventList)}
        renderItem={renderEventItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.eventList}
      />

      <BottomTabs />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
  },
  backButton: {
    marginRight: 15,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 15,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#2A2A2A',
    marginHorizontal: 5,
    borderRadius: 20,
  },
  activeFilterButton: {
    backgroundColor: '#0084FF',
  },
  filterButtonText: {
    color: 'white',
    fontSize: 12,
  },
  activeFilterButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  eventList: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  eventCard: {
    backgroundColor: '#1C1C1E',
    borderRadius: 10,
    marginBottom: 15,
  },
  eventCardContent: {
    padding: 15,
  },
  eventName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  eventDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  eventDetailText: {
    color: '#999',
    fontSize: 14,
    marginLeft: 10,
  },
  eventRegion: {
    color: '#0084FF',
    fontSize: 12,
    marginTop: 5,
  }
});