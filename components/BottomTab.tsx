import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, usePathname, useRouter } from 'expo-router';

type TabName = 'home' | 'search' | 'events' | 'profile';

const BottomTabs = () => {
    const navigation = useNavigation();
    const router = useRouter();
    const currentPath = usePathname();
    const [activeTab, setActiveTab] = useState<TabName>('home');
    
    // Détermine l'onglet actif en fonction du chemin actuel - avec logique plus stricte
    useEffect(() => {
        if (currentPath === '/search_musician') {
            setActiveTab('search');
        } else if (currentPath === '/search') {
            setActiveTab('events');
        } else if (currentPath === '/edit-profile') {
            setActiveTab('profile');
        } else if (currentPath === '/homescreen') {
            setActiveTab('home');
        }
    }, [currentPath]);
    
    // Fonction pour naviguer vers un onglet
    const navigateToTab = (tabName: TabName) => {
        // Mettre à jour immédiatement l'onglet actif pour éviter les décalages visuels
        setActiveTab(tabName);
        
        // Naviguer vers la page correspondante
        switch (tabName) {
            case 'home':
                router.push('/homescreen');
                break;
            case 'search':
                router.push('/search_musician');
                break;
            case 'events':
                router.push('/search');
                break;
            case 'profile':
                router.push('/edit-profile');
                break;
        }
    };
    
    // Fonction pour vérifier si un onglet est actif
    const isActive = (tabName: TabName) => activeTab === tabName;
    
    // Génère la couleur de l'icône en fonction de l'état actif
    const getIconColor = (tabName: TabName) => {
        return isActive(tabName) ? '#007bff' : 'white';
    };
    
    return (
        <View style={styles.bottomTabs}>
            <TouchableOpacity 
                style={styles.tabItem}
                onPress={() => navigateToTab('home')}
            >
                <Ionicons name="home-outline" size={22} color={getIconColor('home')} />
                <Text style={[styles.label, isActive('home') && styles.activeLabel]}>Accueil</Text>
                {isActive('home') && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
            
            <TouchableOpacity 
                style={styles.tabItem}
                onPress={() => navigateToTab('search')}
            >
                <Ionicons name="search" size={22} color={getIconColor('search')} />
                <Text style={[styles.label, isActive('search') && styles.activeLabel]}>Rechercher</Text>
                {isActive('search') && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
            
            <TouchableOpacity 
                style={styles.tabItem}
                onPress={() => navigateToTab('events')}
            >
                <Ionicons name="calendar-outline" size={22} color={getIconColor('events')} />
                <Text style={[styles.label, isActive('events') && styles.activeLabel]}>Evénements</Text>
                {isActive('events') && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
            
            <TouchableOpacity 
                style={styles.tabItem}
                onPress={() => navigateToTab('profile')}
            >
                <Ionicons name="person-outline" size={22} color={getIconColor('profile')} />
                <Text style={[styles.label, isActive('profile') && styles.activeLabel]}>Profil</Text>
                {isActive('profile') && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    bottomTabs: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 70,
        backgroundColor: '#121212',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: 10,
        paddingTop: 5,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    tabItem: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        paddingHorizontal: 15,
        height: '100%',
    },
    label: {
        color: 'white',
        fontSize: 12,
        marginTop: 4,
        opacity: 0.8,
    },
    activeLabel: {
        color: '#007bff',
        fontWeight: 'bold',
        opacity: 1,
    },
    activeIndicator: {
        position: 'absolute',
        bottom: 0,
        width: 5,
        height: 5,
        borderRadius: 2.5,
        backgroundColor: '#007bff',
        marginTop: 2,
    }
});

export default BottomTabs;