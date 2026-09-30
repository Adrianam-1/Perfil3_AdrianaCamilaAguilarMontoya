import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS } from '../constants/theme';
import ApiScreen from '../screens/ApiScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();

// Navegación tipo pila: Perfil (inicial) -> API.
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Profile"
        screenOptions={{
          headerStyle: { backgroundColor: COLORS.primary },
          headerTintColor: COLORS.textOnPrimary,
          headerTitleStyle: { fontWeight: '700' },
          headerTitleAlign: 'center',
          contentStyle: { backgroundColor: COLORS.background },
        }}
      >
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Api" component={ApiScreen} options={{ title: 'Personajes' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
