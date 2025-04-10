import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

const BottomTabs = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.bottomTabs}>
            <View style={styles.tabItem}>
                <Ionicons onPress={() => navigation.navigate('')} name="home-outline" size={20} color="white" />
                <Text style={styles.label}>Accueil</Text>
            </View>
            <View style={styles.tabItem}>
                <Ionicons onPress={() => navigation.navigate('')} name="search" size={20} color="white" />
                <Text style={styles.label}>Rechercher</Text>
            </View>
            <View style={styles.tabItem}>
                <Ionicons onPress={() => navigation.navigate('')} name="calendar-outline" size={20} color="white" />
                <Text style={styles.label}>Evénements</Text>
            </View>
            <View style={styles.tabItem}>
                <Ionicons onPress={() => navigation.navigate('')} name="person-outline" size={20} color="white" />
                <Text style={styles.label}>Profil</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    bottomTabs: {
        position: 'absolute',
        bottom: 0,
        height: 70,
        backgroundColor: '#1A1A1A',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: 10,
    },
    tabItem: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        color: 'white',
        fontSize: 12,
        marginTop: 2,
    },
});

export default BottomTabs;