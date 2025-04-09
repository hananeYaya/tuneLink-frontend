import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from 'expo-router';

export default function RegisterScreen() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            {/* <Image
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          /> */}

            <TextInput
                placeholder="Nom"
                placeholderTextColor="#aaa"
                style={styles.input}
            />
            <TextInput
                placeholder="Prénom"
                placeholderTextColor="#aaa"
                secureTextEntry
                style={styles.input}
            />

            <TextInput
                placeholder="Adresse mail"
                placeholderTextColor="#aaa"
                style={styles.input}
            />
            <TextInput
                placeholder="Mot de passe"
                placeholderTextColor="#aaa"
                secureTextEntry
                style={styles.input}
            />

            <TouchableOpacity style={styles.continueButton} onPress={() => navigation.navigate('')}>
                <Text style={styles.continueButtonText}>Continuer</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('')}>
                <Text style={styles.signupText}>
                    Déjà un compte ? <Text style={{ fontWeight: 'bold' }}>Connectez-vous</Text>
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    logo: {
        width: '100%',
        height: 100,
        marginBottom: 40,
    },
    input: {
        backgroundColor: '#1f1f1f',
        color: 'white',
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
    },
    continueButton: {
        backgroundColor: '#007bff',
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 1,
    },
    continueButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    socialButton: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    socialText: {
        color: '#000',
    },
    signupText: {
        color: '#aaa',
        textAlign: 'center',
        marginTop: 20,
    },
});
