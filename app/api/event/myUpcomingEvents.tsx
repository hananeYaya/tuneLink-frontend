import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
  ImageSourcePropType,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Définition des types
interface EventItem {
  id: number;
  name: string;
  city: string;
  time: string;
  image: ImageSourcePropType;
}

interface EventGroup {
  id: number;
  date: string;
  region: string | null;
  events: EventItem[];
}

const EventsScreen = () => {
  const [filterType, setFilterType] = useState("date"); // 'date' ou 'region'

  // Données fictives pour les événements
  const events: EventGroup[] = [
    {
      id: 1,
      date: "Vendredi 11 avril 2025",
      region: "Nom de la région",
      events: [
        {
          id: 101,
          name: "Nom de l'événement",
          city: "Ville",
          time: "Heure de début de l'événement",
          image: require("@/assets/images/concert.jpg"), // Remplacer par votre image
        },
        {
          id: 102,
          name: "Nom de l'événement",
          city: "Ville",
          time: "Heure de début de l'événement",
          image: require("@/assets/images/exhibition.jpg"), // Remplacer par votre image
        },
      ],
    },
    {
      id: 2,
      date: "Vendredi 11 avril 2025",
      region: "Nom de la région",
      events: [
        {
          id: 201,
          name: "Nom de l'événement",
          city: "Ville",
          time: "Heure de début de l'événement",
          image: require("@/assets/images/exhibition.jpg"), // Remplacer par votre image
        },
      ],
    },
    {
      id: 3,
      date: "Samedi 12 avril 2025",
      region: null,
      events: [],
    },
  ];

  const renderEventCard = (event: EventItem) => {
    return (
      <TouchableOpacity key={event.id} style={styles.eventCard}>
        <Image source={event.image} style={styles.eventImage} />
        <View style={styles.eventInfo}>
          <Text style={styles.eventName}>{event.name}</Text>
          <Text style={styles.eventCity}>{event.city}</Text>
          <Text style={styles.eventTime}>{event.time}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderEventsByDate = () => {
    return events.map((dateGroup: EventGroup) => (
      <View key={dateGroup.id}>
        {dateGroup.region && (
          <Text style={styles.regionTitle}>{dateGroup.region}</Text>
        )}

        <Text style={styles.dateTitle}>{dateGroup.date}</Text>

        {dateGroup.events.map((event: EventItem) => renderEventCard(event))}
      </View>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E1E1E" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mes événements à venir</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="chatbubble-outline" size={22} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="notifications-outline" size={22} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterTab,
            filterType === "date" && styles.activeFilterTab,
          ]}
          onPress={() => setFilterType("date")}
        >
          <Text
            style={[
              styles.filterText,
              filterType === "date" && styles.activeFilterText,
            ]}
          >
            Par date
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterTab,
            filterType === "region" && styles.activeFilterTab,
          ]}
          onPress={() => setFilterType("region")}
        >
          <Text
            style={[
              styles.filterText,
              filterType === "region" && styles.activeFilterText,
            ]}
          >
            Par région
          </Text>
        </TouchableOpacity>
      </View>

      {/* Events List */}
      <ScrollView style={styles.eventsList}>{renderEventsByDate()}</ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home-outline" size={24} color="#8E8E93" />
          <Text style={styles.navText}>Accueil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="search-outline" size={24} color="#8E8E93" />
          <Text style={styles.navText}>Rechercher</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
          <Ionicons name="calendar-outline" size={24} color="#FFFFFF" />
          <Text style={[styles.navText, styles.activeNavText]}>Événements</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={24} color="#8E8E93" />
          <Text style={styles.navText}>Profil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#1A1A1A",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  headerIcons: {
    flexDirection: "row",
  },
  headerIcon: {
    marginLeft: 16,
  },
  filterContainer: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  filterTab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: "#333333",
  },
  activeFilterTab: {
    backgroundColor: "#444444",
  },
  filterText: {
    color: "#AAAAAA",
    fontSize: 14,
  },
  activeFilterText: {
    color: "white",
  },
  eventsList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  dateTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  regionTitle: {
    color: "#BBBBBB",
    fontSize: 16,
    marginTop: 20,
    marginBottom: 4,
  },
  eventCard: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#252525",
  },
  eventImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
  },
  eventInfo: {
    padding: 12,
  },
  eventName: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  eventCity: {
    color: "#BBBBBB",
    fontSize: 14,
    marginTop: 2,
  },
  eventTime: {
    color: "#999999",
    fontSize: 13,
    marginTop: 2,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#333333",
    backgroundColor: "#1A1A1A",
  },
  navItem: {
    alignItems: "center",
    padding: 8,
  },
  activeNavItem: {},
  navText: {
    color: "#8E8E93",
    fontSize: 12,
    marginTop: 4,
  },
  activeNavText: {
    color: "white",
  },
});

export default EventsScreen;
