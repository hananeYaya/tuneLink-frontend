import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
const router = useRouter();

export default function EventsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Événements</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="chatbubble-outline" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Event Cards */}
      <View style={styles.cardsContainer}>
        {/* Upcoming Events Card */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/events/upcomingEvents")}
        >
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
            }}
            style={styles.cardImage}
          />
          <View style={styles.cardOverlay} />
          <Text style={styles.cardTitle}>Événements à venir</Text>
        </TouchableOpacity>

        {/* My Events Card */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/events/myEvents")}
        >
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1571266028240-feb5adaa4b58?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
            }}
            style={styles.cardImage}
          />
          <View style={styles.cardOverlay} />
          <Text style={styles.cardTitle}>Mes événements</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="home-outline" size={24} color="#777" />
          <Text style={styles.tabText}>Accueil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="search-outline" size={24} color="#777" />
          <Text style={styles.tabText}>Rechercher</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.tabItem, styles.activeTab]}>
          <MaterialCommunityIcons
            name="calendar-month-outline"
            size={24}
            color="white"
          />
          <Text style={[styles.tabText, styles.activeTabText]}>Événements</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="person-outline" size={24} color="#777" />
          <Text style={styles.tabText}>Profil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  headerIcons: {
    flexDirection: "row",
  },
  iconButton: {
    marginLeft: 20,
  },
  cardsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  card: {
    height: 170,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 15,
    position: "relative",
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  cardTitle: {
    position: "absolute",
    bottom: 15,
    left: 15,
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#333",
    paddingVertical: 10,
    backgroundColor: "#222",
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabText: {
    color: "#777",
    fontSize: 12,
    marginTop: 4,
  },
  activeTab: {
    backgroundColor: "transparent",
  },
  activeTabText: {
    color: "white",
  },
});
