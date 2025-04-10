import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Modal,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const EventOrganizerScreen = () => {
  const [eventName, setEventName] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDescription, setEventDescription] = useState("");

  // États pour gérer les dates et les heures
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(
    new Date(new Date().getTime() + 2 * 60 * 60 * 1000)
  ); // +2 heures par défaut

  // Créer notre propre sélecteur de date et heure
  const [showStartDateModal, setShowStartDateModal] = useState(false);
  const [showStartTimeModal, setShowStartTimeModal] = useState(false);
  const [showEndDateModal, setShowEndDateModal] = useState(false);
  const [showEndTimeModal, setShowEndTimeModal] = useState(false);

  // Génération des options de date (pour les 14 prochains jours)
  const generateDateOptions = () => {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }

    return dates;
  };

  // Génération des options d'heure (de 00:00 à 23:30 par pas de 30 minutes)
  const generateTimeOptions = () => {
    const times = [];
    const baseDate = new Date();
    baseDate.setHours(0, 0, 0, 0);

    for (let i = 0; i < 48; i++) {
      const time = new Date(baseDate);
      time.setMinutes(i * 30);
      times.push(time);
    }

    return times;
  };

  const dateOptions = generateDateOptions();
  const timeOptions = generateTimeOptions();

  // Sélectionneurs personnalisés pour la date et l'heure
  const selectStartDate = (date: Date) => {
    const newStartDate = new Date(startDate);
    newStartDate.setFullYear(date.getFullYear());
    newStartDate.setMonth(date.getMonth());
    newStartDate.setDate(date.getDate());
    setStartDate(newStartDate);
    setShowStartDateModal(false);

    // Mettre à jour la date de fin si elle est antérieure à la date de début
    if (endDate < newStartDate) {
      const newEndDate = new Date(newStartDate);
      newEndDate.setHours(newStartDate.getHours() + 2);
      setEndDate(newEndDate);
    }
  };

  const selectStartTime = (time: Date) => {
    const newStartDate = new Date(startDate);
    newStartDate.setHours(time.getHours());
    newStartDate.setMinutes(time.getMinutes());
    setStartDate(newStartDate);
    setShowStartTimeModal(false);

    // Mettre à jour l'heure de fin si elle est antérieure à l'heure de début
    if (endDate < newStartDate) {
      const newEndDate = new Date(newStartDate);
      newEndDate.setHours(newStartDate.getHours() + 2);
      setEndDate(newEndDate);
    }
  };

  const selectEndDate = (date: Date) => {
    const newEndDate = new Date(endDate);
    newEndDate.setFullYear(date.getFullYear());
    newEndDate.setMonth(date.getMonth());
    newEndDate.setDate(date.getDate());
    setEndDate(newEndDate);
    setShowEndDateModal(false);
  };

  const selectEndTime = (time: Date) => {
    const newEndDate = new Date(endDate);
    newEndDate.setHours(time.getHours());
    newEndDate.setMinutes(time.getMinutes());
    setEndDate(newEndDate);
    setShowEndTimeModal(false);
  };

  // Formatage de la date et l'heure pour l'affichage
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Pour masquer le clavier quand on touche en dehors des champs texte
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = () => {
    // Ici vous pourriez implémenter la logique pour sauvegarder l'événement
    console.log({
      eventName,
      eventLocation,
      eventDescription,
      startDate,
      endDate,
    });

    // Réinitialiser le formulaire ou naviguer vers une autre page
    alert("Événement créé avec succès !");
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />

        {/* En-tête */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Organiser un événement</Text>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          {/* Nom de l'événement */}
          <TextInput
            style={styles.input}
            placeholder="Nom de l'événement"
            placeholderTextColor="#8E8E93"
            value={eventName}
            onChangeText={setEventName}
          />

          {/* Date et heure de début */}
          <View style={styles.dateTimeContainer}>
            <TouchableOpacity
              style={styles.dateTimeButton}
              onPress={() => setShowStartDateModal(true)}
            >
              <Text style={styles.dateTimeText}>{formatDate(startDate)}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dateTimeButton}
              onPress={() => setShowStartTimeModal(true)}
            >
              <Text style={styles.dateTimeText}>{formatTime(startDate)}</Text>
            </TouchableOpacity>
          </View>

          {/* Date et heure de fin */}
          <View style={styles.dateTimeContainer}>
            <TouchableOpacity
              style={styles.dateTimeButton}
              onPress={() => setShowEndDateModal(true)}
            >
              <Text style={styles.dateTimeText}>{formatDate(endDate)}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dateTimeButton}
              onPress={() => setShowEndTimeModal(true)}
            >
              <Text style={styles.dateTimeText}>{formatTime(endDate)}</Text>
            </TouchableOpacity>
          </View>

          {/* Lieu de l'événement */}
          <TextInput
            style={styles.input}
            placeholder="Lieu de l'événement"
            placeholderTextColor="#8E8E93"
            value={eventLocation}
            onChangeText={setEventLocation}
          />

          {/* Description */}
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder="Description"
            placeholderTextColor="#8E8E93"
            multiline
            numberOfLines={4}
            value={eventDescription}
            onChangeText={setEventDescription}
          />

          {/* Boutons de validation et d'annulation */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Annuler</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Valider</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Navigation en bas */}
        <View style={styles.tabBar}>
          <TouchableOpacity style={styles.tabItem}>
            <Ionicons name="home-outline" size={24} color="#8E8E93" />
            <Text style={styles.tabLabel}>Accueil</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tabItem}>
            <Ionicons name="search-outline" size={24} color="#8E8E93" />
            <Text style={styles.tabLabel}>Rechercher</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tabItem}>
            <Ionicons name="calendar-outline" size={24} color="#0084FF" />
            <Text style={styles.tabLabelActive}>Événements</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tabItem}>
            <Ionicons name="person-outline" size={24} color="#8E8E93" />
            <Text style={styles.tabLabel}>Profil</Text>
          </TouchableOpacity>
        </View>

        {/* Modals pour sélectionner la date et l'heure */}
        {/* Modal pour la date de début */}
        <Modal
          visible={showStartDateModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowStartDateModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Sélectionner une date</Text>
                <TouchableOpacity onPress={() => setShowStartDateModal(false)}>
                  <Ionicons name="close" size={24} color="white" />
                </TouchableOpacity>
              </View>
              <ScrollView style={styles.modalScrollView}>
                {dateOptions.map((date, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.modalOption}
                    onPress={() => selectStartDate(date)}
                  >
                    <Text
                      style={[
                        styles.modalOptionText,
                        date.getDate() === startDate.getDate() &&
                          date.getMonth() === startDate.getMonth() &&
                          date.getFullYear() === startDate.getFullYear() &&
                          styles.modalOptionSelected,
                      ]}
                    >
                      {formatDate(date)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>

        {/* Modal pour l'heure de début */}
        <Modal
          visible={showStartTimeModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowStartTimeModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Sélectionner une heure</Text>
                <TouchableOpacity onPress={() => setShowStartTimeModal(false)}>
                  <Ionicons name="close" size={24} color="white" />
                </TouchableOpacity>
              </View>
              <ScrollView style={styles.modalScrollView}>
                {timeOptions.map((time, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.modalOption}
                    onPress={() => selectStartTime(time)}
                  >
                    <Text
                      style={[
                        styles.modalOptionText,
                        time.getHours() === startDate.getHours() &&
                          time.getMinutes() === startDate.getMinutes() &&
                          styles.modalOptionSelected,
                      ]}
                    >
                      {formatTime(time)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>

        {/* Modal pour la date de fin */}
        <Modal
          visible={showEndDateModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowEndDateModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Sélectionner une date</Text>
                <TouchableOpacity onPress={() => setShowEndDateModal(false)}>
                  <Ionicons name="close" size={24} color="white" />
                </TouchableOpacity>
              </View>
              <ScrollView style={styles.modalScrollView}>
                {dateOptions.map((date, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.modalOption}
                    onPress={() => selectEndDate(date)}
                  >
                    <Text
                      style={[
                        styles.modalOptionText,
                        date.getDate() === endDate.getDate() &&
                          date.getMonth() === endDate.getMonth() &&
                          date.getFullYear() === endDate.getFullYear() &&
                          styles.modalOptionSelected,
                      ]}
                    >
                      {formatDate(date)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>

        {/* Modal pour l'heure de fin */}
        <Modal
          visible={showEndTimeModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowEndTimeModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Sélectionner une heure</Text>
                <TouchableOpacity onPress={() => setShowEndTimeModal(false)}>
                  <Ionicons name="close" size={24} color="white" />
                </TouchableOpacity>
              </View>
              <ScrollView style={styles.modalScrollView}>
                {timeOptions.map((time, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.modalOption}
                    onPress={() => selectEndTime(time)}
                  >
                    <Text
                      style={[
                        styles.modalOptionText,
                        time.getHours() === endDate.getHours() &&
                          time.getMinutes() === endDate.getMinutes() &&
                          styles.modalOptionSelected,
                      ]}
                    >
                      {formatTime(time)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 56,
    borderBottomWidth: 0.5,
    borderBottomColor: "#333333",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    color: "white",
    fontWeight: "600",
  },
  notificationButton: {
    padding: 8,
  },
  formContainer: {
    flex: 1,
    padding: 16,
  },
  input: {
    backgroundColor: "#1C1C1E",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: "white",
    fontSize: 16,
    marginBottom: 16,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: "top",
  },
  dateTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  dateTimeButton: {
    backgroundColor: "#1C1C1E",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flex: 0.48,
    alignItems: "center",
  },
  dateTimeText: {
    color: "white",
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cancelButton: {
    flex: 0.48,
    backgroundColor: "#2C2C2E",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  submitButton: {
    flex: 0.48,
    backgroundColor: "#0084FF",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  tabBar: {
    flexDirection: "row",
    height: 56,
    borderTopWidth: 0.5,
    borderTopColor: "#333333",
    backgroundColor: "#1C1C1E",
  },
  tabItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabLabel: {
    fontSize: 12,
    color: "#8E8E93",
    marginTop: 4,
  },
  tabLabelActive: {
    fontSize: 12,
    color: "#0084FF",
    marginTop: 4,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#1C1C1E",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "70%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: "#333333",
  },
  modalTitle: {
    fontSize: 18,
    color: "white",
    fontWeight: "600",
  },
  modalScrollView: {
    padding: 16,
  },
  modalOption: {
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: "#333333",
  },
  modalOptionText: {
    fontSize: 16,
    color: "white",
  },
  modalOptionSelected: {
    color: "#0084FF",
    fontWeight: "600",
  },
});

export default EventOrganizerScreen;
