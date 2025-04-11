import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="map" />
      <Stack.Screen name="create-profile" />
      <Stack.Screen name="EventsScreen" options={{ title: 'Événements' }}/>
      <Stack.Screen name="UpcomingEventsScreen" options={{ title: 'Événements à venir' }}/>
      <Stack.Screen name="CreateEventScreen" options={{ title: 'Créer un événement' }}/>
    </Stack>
  );
}