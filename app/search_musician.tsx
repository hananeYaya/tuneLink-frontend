import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import BottomTabs from '../components/BottomTab';
import { useNavigation } from 'expo-router';


export default function SearchMusician() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Rechercher</Text>
                <View style={styles.headerIcons}>
                    <Feather name="message-circle" size={20} color="white" style={styles.icon} />
                    <Ionicons name="notifications-outline" size={20} color="white" />
                </View>
            </View>

            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
                <TextInput
                    placeholder="Chercher"
                    placeholderTextColor="gray"
                    style={styles.searchInput}
                />
            </View>

            <View style={styles.centeredSection}>
                <Text style={styles.info}>
                    Chercher un musicien grâce à notre nouvelle fonctionnalité de{' '}
                    <Text style={{ fontWeight: 'bold' }}>géolocalisation</Text>.
                </Text>
                <Button title="Afficher la carte" onPress={() => navigation.navigate('map')} color="#007bff" />
            </View>

            <View>
                <BottomTabs />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 20,
    },
    title: {
        fontSize: 20,
        color: 'white',
        marginBottom: 20,
        fontWeight: 'bold',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    headerText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    headerIcons: {
        flexDirection: 'row',
    },
    icon: {
        marginRight: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        backgroundColor: '#1E1E1E',
        borderRadius: 20,
        paddingHorizontal: 20,
        alignItems: 'center',
        marginTop: 20,
    },
    searchInput: {
        flex: 1,
        color: 'white',
        paddingVertical: 10,
    },
    searchIcon: {
        marginRight: 10,
    },
    centeredSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    info: {
        color: '#ccc',
        marginBottom: 20,
        textAlign: 'center',
    },
});