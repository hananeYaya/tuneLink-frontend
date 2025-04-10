import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Pressable } from 'react-native';
import { useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ReceiverProfile() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={20} color="white" />
            </Pressable>

            <Text style={styles.title}>Nom du receveur</Text>


            <View style={styles.profileContainer}>
                <Image source={require('../assets/receiverImage.png')} />
                <Text style={styles.name}>Nom du receveur</Text>
                <Text style={styles.region}>Région</Text>
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.btnText}>Voir le profil</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
                <TextInput placeholder="Taper votre message..." placeholderTextColor="#aaa" style={styles.input} />
                <TouchableOpacity>
                    <Text style={styles.send}>➤</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#111', padding: 20 },
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
    profileContainer: { alignItems: 'center', marginTop: 40 },
    name: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
    region: { color: '#aaa', fontSize: 20 },
    btn: { backgroundColor: '#333', padding: 10, borderRadius: 8, marginTop: 10 },
    btnText: { color: '#fff' },
    inputContainer: {
        position: 'absolute',
        bottom: 10,
        left: 20,
        right: 20,
        backgroundColor: '#222',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 25,
        paddingHorizontal: 20,
    },
    input: { flex: 1, color: '#fff' },
    send: { color: '#fff', fontSize: 20, marginLeft: 8 },
});