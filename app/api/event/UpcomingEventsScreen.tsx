import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// Définition des types
interface Event {
  id: string;
  name: string;
  city: string;
  time: string;
  image: any;
}

interface EventGroup {
  id: string;
  date: string;
  region: string;
  events: Event[];
}

// Données en dur pour l'affichage de démonstration
const MOCK_EVENTS: EventGroup[] = [
  {
    id: "1",
    date: "Vendredi 11 avril 2025",
    region: "Île-de-France",
    events: [
      {
        id: "101",
        name: "Festival de Musique",
        city: "Paris",
        time: "20:00",
        image: require('@/assets/images/concert.jpg'),
      },
      {
        id: "102",
        name: "Festival de Musique 2",
        city: "Versailles",
        time: "10:00",
        image: require('@/assets/images/exhibition.jpg'),
      },
    ],
  },
  {
    id: "2",
    date: "Samedi 12 avril 2025",
    region: "Provence-Alpes-Côte d'Azur",
    events: [
      {
        id: "201",
        name: "Festival de Musique 3",
        city: "Nice",
        time: "14:00",
        image: require('@/assets/images/exhibition.jpg'),
      },
    ],
  },
];
// Définir les types pour le composant FilterSelector
type FilterType = "date" | "region";

interface FilterSelectorProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

// Composant pour le filtre (Par date/Par région)
const FilterSelector: React.FC<FilterSelectorProps> = ({
  currentFilter,
  onFilterChange,
}) => {
  return (
    <View style={styles.filterContainer}>
      <TouchableOpacity
        style={[
          styles.filterButton,
          currentFilter === "date" && styles.filterButtonActive,
        ]}
        onPress={() => onFilterChange("date")}
      >
        <Text style={styles.filterText}>Par date</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.filterButton,
          currentFilter === "region" && styles.filterButtonActive,
        ]}
        onPress={() => onFilterChange("region")}
      >
        <Text style={styles.filterText}>Par région</Text>
      </TouchableOpacity>
    </View>
  );
};

// Composant pour un événement individuel
interface EventItemProps {
  event: Event;
}

const EventItem: React.FC<EventItemProps> = ({ event }) => {
  return (
    <View style={styles.eventItem}>
      <Image source={event.image} style={styles.eventImage} />
      <View style={styles.eventOverlay}>
        <Text style={styles.eventName}>{event.name}</Text>
        <Text style={styles.eventCity}>{event.city}</Text>
        <Text style={styles.eventTime}>
          Heure de début de l'événement: {event.time}
        </Text>
      </View>
    </View>
  );
};

// Composant principal
const UpcomingEventsScreen: React.FC = () => {
  const router = useRouter();
  const [filter, setFilter] = useState<"date" | "region">("date");

  // Rendu d'un groupe d'événements (par date)
  const renderDateGroup = ({ item }: { item: EventGroup }) => {
    return (
      <View style={styles.dateGroup}>
        <Text style={styles.dateTitle}>{item.date}</Text>
        {item.events.map((event) => (
          <EventItem key={event.id} event={event} />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#222" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mes événements à venir</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => router.push('/receiver')}
          >
            <Ionicons name="chatbox-outline" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="notifications-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Filter */}
      <FilterSelector currentFilter={filter} onFilterChange={setFilter} />

      {/* Events List */}
      <FlatList
        data={MOCK_EVENTS}
        renderItem={renderDateGroup}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.eventsList}
      />

      {/* Bottom Tab Bar */}
      <View style={styles.bottomTabBar}>
        <TouchableOpacity style={styles.tabBarItem}>
          <Ionicons name="home-outline" size={24} color="#999" />
          <Text style={styles.tabBarText}>Accueil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabBarItem}>
          <Ionicons name="search-outline" size={24} color="#999" />
          <Text style={styles.tabBarText}>Rechercher</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabBarItem}>
          <Ionicons name="calendar-outline" size={24} color="#fff" />
          <Text style={[styles.tabBarText, styles.activeTabText]}>
            Événements
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabBarItem}>
          <Ionicons name="person-outline" size={24} color="#999" />
          <Text style={styles.tabBarText}>Profil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: "#222",
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  headerButtons: {
    flexDirection: "row",
  },
  headerButton: {
    marginLeft: 15,
  },
  filterContainer: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "center",
  },
  filterButton: {
    backgroundColor: "#333",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  filterButtonActive: {
    backgroundColor: "#555",
  },
  filterText: {
    color: "white",
    fontSize: 14,
  },
  eventsList: {
    paddingBottom: 20,
  },
  dateGroup: {
    marginBottom: 15,
  },
  dateTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  eventItem: {
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 10,
    overflow: "hidden",
    height: 120,
  },
  eventImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  eventOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 15,
    height: "100%",
    justifyContent: "flex-end",
  },
  eventName: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  eventCity: {
    color: "white",
    fontSize: 14,
    marginTop: 2,
  },
  eventTime: {
    color: "white",
    fontSize: 12,
    marginTop: 2,
  },
  bottomTabBar: {
    flexDirection: "row",
    backgroundColor: "#222",
    paddingBottom: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  tabBarItem: {
    flex: 1,
    alignItems: "center",
  },
  tabBarText: {
    color: "#999",
    fontSize: 12,
    marginTop: 3,
  },
  activeTabText: {
    color: "white",
  },
});

export default UpcomingEventsScreen;