import { View, Text, TextInput, Button, StyleSheet, Image, Pressable } from 'react-native';
import { useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import BottomTabs from '../components/BottomTab';

export default function EditProfile() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={20} color="white" />
                </Pressable>

                <Text style={styles.title}>Modifier votre profil</Text>

                <Pressable style={styles.profileImageContainer}>
                    <Image
                        source={require('../assets/profileImage.png')}
                        style={styles.profileImage}
                    />
                    <Ionicons name="pencil" size={24} color="white" style={styles.editIcon} />
                </Pressable>
                
                <Text style={styles.profileName}>Nom de profil</Text>

                <TextInput style={styles.input} placeholder="Nom de profil" placeholderTextColor="#aaa" />
                <TextInput style={styles.input} placeholder="Description" placeholderTextColor="#aaa" />
                <TextInput style={styles.input} placeholder="Instruments joués" placeholderTextColor="#aaa" />
                <TextInput style={styles.input} placeholder="Influences musicales" placeholderTextColor="#aaa" />

                <View style={styles.buttonContainer}>
                    <Pressable style={[styles.button, styles.cancelButton]} onPress={() => navigation.goBack()}>
                        <Text style={styles.buttonText}>Annuler</Text>
                    </Pressable>
                    <Pressable style={[styles.button, styles.validateButton]} onPress={() => alert("Profil validé")}>
                        <Text style={styles.buttonText}>Valider</Text>
                    </Pressable>
                </View>
            </View>

            <Pressable style={styles.logoutButton} onPress={() => alert("Déconnexion effectuée")}>
                <Ionicons name="log-out-outline" size={20} color="white" />
            </Pressable>

            <View style={styles.bottomTabsContainer}>
                <BottomTabs />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        paddingHorizontal: 20,
        paddingTop: 50,
    },
    content: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    backButton: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
    },
    title: {
        fontSize: 20,
        color: 'white',
        marginBottom: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    profileImageContainer: {
        position: 'relative',
        alignSelf: 'center',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    editIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#007bff',
        borderRadius: 15,
        padding: 5,
    },
    profileName: {
        color: '#ccc',
        textAlign: 'center',
        marginVertical: 10,
    },
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
    button: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
    },
    cancelButton: {
        backgroundColor: '#ccc',
    },
    validateButton: {
        backgroundColor: '#007bff',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    logoutButton: {
        position: 'absolute',
        top: 50,
        right: 20,
        zIndex: 1,
    },
    bottomTabsContainer: {
        borderTopWidth: 1,
        borderTopColor: '#333',
    },
});
