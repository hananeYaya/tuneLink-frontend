import { View, Text, TextInput, Button, StyleSheet, Image, Pressable } from 'react-native';
import { useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function CreateProfile() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={20} color="white" />
            </Pressable>

            <Text style={styles.title}>Créer votre profil</Text>

            <Pressable>
                <Image
                    source={require('../assets/profileImage.png')}
                    style={styles.profileImage}
                />
            </Pressable>
            <Text style={styles.profileName}>Nom de profil</Text>

            <TextInput style={styles.input} placeholder="Nom de profil" placeholderTextColor="#aaa" />
            <TextInput style={styles.input} placeholder="Description" placeholderTextColor="#aaa" />
            <TextInput style={styles.input} placeholder="Instruments joués" placeholderTextColor="#aaa" />
            <TextInput style={styles.input} placeholder="Influences musicales" placeholderTextColor="#aaa" />

            <View style={styles.buttonContainer}>
                <Button title="Annuler" onPress={() => navigation.navigate('login')} color="#ccc" />
                <Button title="Valider" onPress={() => navigation.navigate('homescreen')} color="#007bff" />
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#121212', padding: 20 },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 1,
    },
    title: {
        fontSize: 20,
        color: 'white',
        marginBottom: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    profileImage: { width: 100, height: 100, borderRadius: 50, alignSelf: 'center' },
    profileName: { color: '#ccc', textAlign: 'center', marginVertical: 10 },
    input: {
        borderWidth: 1,
        borderColor: '#444',
        borderRadius: 10,
        padding: 10,
        color: '#fff',
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
});

