import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
  Image,
  Alert
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import BottomTabs from '../components/BottomTab';

export default function CreateEventScreen() {
  const router = useRouter();
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [bannerImage, setBannerImage] = useState<string | null>(null);

  const handleAddBanner = () => {
    Alert.alert(
      'Ajouter une bannière',
      'Cette fonctionnalité sera bientôt disponible',
      [{ text: 'OK', style: 'cancel' }]
    );
  };

  const handleSubmit = () => {
    // Validate required fields
    if (!eventName.trim()) {
      Alert.alert('Erreur', 'Le nom de l\'événement est requis');
      return;
    }

    if (!eventDate.trim()) {
      Alert.alert('Erreur', 'La date de l\'événement est requise');
      return;
    }

    if (!eventTime.trim()) {
      Alert.alert('Erreur', 'L\'heure de l\'événement est requise');
      return;
    }

    if (!eventLocation.trim()) {
      Alert.alert('Erreur', 'Le lieu de l\'événement est requis');
      return;
    }

    // Prepare event data
    const eventData = {
      name: eventName,
      date: eventDate,
      time: eventTime,
      location: eventLocation,
      description: eventDescription,
      banner: bannerImage
    };

    // TODO: Implement actual event creation logic
    console.log('Event submitted:', eventData);

    // Show success message
    Alert.alert(
      'Événement créé', 
      'Votre événement a été créé avec succès',
      [{ 
        text: 'OK', 
        onPress: () => router.push('/EventsScreen') 
      }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Créer un événement</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => router.push('/receiver')}>
            <Feather name="message-circle" size={24} color="white" style={styles.icon} />
          </TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="white" />
        </View>
      </View>

      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Banner Image Upload */}
        <TouchableOpacity 
          style={styles.bannerUpload} 
          onPress={handleAddBanner}
        >
          {bannerImage ? (
            <Image 
              source={{ uri: bannerImage }} 
              style={styles.bannerImage} 
            />
          ) : (
            <View style={styles.bannerPlaceholder}>
              <Ionicons name="camera" size={48} color="#666" />
              <Text style={styles.bannerPlaceholderText}>
                Télécharger une bannière
              </Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Event Name */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Nom de l'événement*</Text>
          <TextInput
            style={styles.input}
            value={eventName}
            onChangeText={setEventName}
            placeholder="Entrez le nom de l'événement"
            placeholderTextColor="#666"
          />
        </View>

        {/* Date and Time */}
        <View style={styles.rowContainer}>
          <View style={styles.halfInputContainer}>
            <Text style={styles.inputLabel}>Date*</Text>
            <TextInput
              style={styles.input}
              value={eventDate}
              onChangeText={setEventDate}
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#666"
              keyboardType="numeric"
            />
          </View>
          <View style={styles.halfInputContainer}>
            <Text style={styles.inputLabel}>Heure*</Text>
            <TextInput
              style={styles.input}
              value={eventTime}
              onChangeText={setEventTime}
              placeholder="HH:MM"
              placeholderTextColor="#666"
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Location */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Lieu*</Text>
          <TextInput
            style={styles.input}
            value={eventLocation}
            onChangeText={setEventLocation}
            placeholder="Adresse ou nom du lieu"
            placeholderTextColor="#666"
          />
        </View>

        {/* Description */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={eventDescription}
            onChangeText={setEventDescription}
            placeholder="Décrivez votre événement"
            placeholderTextColor="#666"
            multiline
            numberOfLines={4}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity 
          style={styles.submitButton} 
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Créer l'événement</Text>
        </TouchableOpacity>
      </ScrollView>

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
  scrollContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  bannerUpload: {
    height: 200,
    backgroundColor: '#1C1C1E',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bannerPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerPlaceholderText: {
    color: '#666',
    marginTop: 10,
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    color: 'white',
    marginBottom: 8,
    fontSize: 14,
  },
  input: {
    backgroundColor: '#1C1C1E',
    color: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 14,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  halfInputContainer: {
    width: '48%',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  submitButton: {
    backgroundColor: '#0084FF',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 15,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});