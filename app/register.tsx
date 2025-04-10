import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { authService } from './api/authService';

interface FormData {
    nom: string;
    prenom: string;
    email: string;
    password: string;
}

export default function RegisterScreen() {
    const router = useRouter();
    const [formData, setFormData] = useState<FormData>({
        nom: '',
        prenom: '',
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleRegister = async () => {
        // Validation basique
        const { nom, prenom, email, password } = formData;
        
        if (!nom || !prenom || !email || !password) {
            Alert.alert('Erreur', 'Veuillez remplir tous les champs');
            return;
        }
        
        setLoading(true);
        
        try {
            await authService.register(formData);
            Alert.alert(
                'Inscription réussie', 
                'Votre compte a été créé avec succès',
                [{ text: 'OK', onPress: () => router.push('/create-profile') }]
            );
        } catch (error: unknown) {
            console.error('Registration error:', error);
            
            // Affichage de l'erreur
            if (error instanceof Error) {
                Alert.alert('Erreur', error.message);
            } else if (error && typeof error === 'object' && 'response' in error) {
                const response = error.response;
                if (response && typeof response === 'object' && 'data' in response) {
                    const data = response.data;
                    if (data && typeof data === 'object' && 'message' in data && typeof data.message === 'string') {
                        Alert.alert('Erreur', data.message);
                    } else {
                        Alert.alert('Erreur', 'Une erreur est survenue lors de l\'inscription');
                    }
                } else {
                    Alert.alert('Erreur', 'Une erreur est survenue lors de l\'inscription');
                }
            } else {
                Alert.alert('Erreur', 'Une erreur est survenue lors de l\'inscription');
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
                placeholder="Nom"
                placeholderTextColor="#aaa"
                style={styles.input}
                value={formData.nom}
                onChangeText={(text) => handleChange('nom', text)}
            />
            <TextInput
                placeholder="Prénom"
                placeholderTextColor="#aaa"
                style={styles.input}
                value={formData.prenom}
                onChangeText={(text) => handleChange('prenom', text)}
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
                onPress={handleRegister}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.continueButtonText}>Continuer</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/login')}>
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