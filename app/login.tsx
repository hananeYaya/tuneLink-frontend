import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LoginFormData {
    email: string;
    password: string;
}

const API_URL = 'http://91.134.83.5:8000';

export default function LoginScreen() {
    const router = useRouter();
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (field: keyof LoginFormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleLogin = async () => {
        // Validation basique
        const { email, password } = formData;
        
        if (!email || !password) {
            Alert.alert('Erreur', 'Veuillez remplir tous les champs');
            return;
        }
        
        setLoading(true);
        
        try {
            const formData = new URLSearchParams();
            formData.append('username', email); // L'API attend username même si c'est un email
            formData.append('password', password);
            
            const response = await axios.post(`${API_URL}/api/v1/auth/login`, formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            
            if (response.data && response.data.access_token) {
                // Stocker le token
                await AsyncStorage.setItem('userToken', response.data.access_token);
                
                // Log pour déboguer
                console.log('Login successful, token stored');
                
                // Redirection vers la page d'accueil
                router.replace('/homescreen');
            } else {
                Alert.alert('Erreur', 'Réponse du serveur invalide');
            }
        } catch (error: any) {
            // Suppression du console.error pour éviter l'affichage de l'erreur dans la console
            
            // Gestion spécifique de l'erreur 401
            if (error.response && error.response.status === 401) {
                Alert.alert('Erreur d\'authentification', 'Identifiants incorrects. Vérifiez votre email et mot de passe.');
            } else {
                Alert.alert('Erreur', 'Impossible de se connecter au serveur. Veuillez réessayer plus tard.');
            }
        } finally {
            setLoading(false);
        }
    };

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
                value={formData.email}
                onChangeText={(text) => handleChange('email', text)}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                placeholder="Mot de passe"
                placeholderTextColor="#aaa"
                secureTextEntry
                style={styles.input}
                value={formData.password}
                onChangeText={(text) => handleChange('password', text)}
            />

            <TouchableOpacity
                style={styles.continueButton}
                onPress={handleLogin}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.continueButtonText}>Continuer</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialText}>Se connecter avec Compte Google </Text>
                <AntDesign name="google" size={20} color="black" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialText}>Se connecter avec Compte Apple </Text>
                <FontAwesome name="apple" size={22} color="black" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/register')}>
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