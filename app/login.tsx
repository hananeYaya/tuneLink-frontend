import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';


export default function LoginScreen() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/logo.png')}
                style={styles.logo}
                resizeMode="contain"
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

            <TouchableOpacity
                style={styles.continueButton}
                onPress={() => navigation.push('create-profile' as any)}
            >
                <Text style={styles.continueButtonText}>Continuer</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialText}>Se connecter avec Compte Google </Text>
                <AntDesign name="google" size={20} color="black" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialText}>Se connecter avec Compte Apple </Text>
                <FontAwesome name="apple" size={22} color="black" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('register')}>
                <Text style={styles.signupText}>
                    Pas de compte ? <Text style={{ fontWeight: 'bold' }}>Inscrivez-vous</Text>
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
        borderRadius: 10,
        marginBottom: 12,
    },
    continueButton: {
        backgroundColor: '#007bff',
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 12,
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