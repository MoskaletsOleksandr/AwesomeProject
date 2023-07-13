import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Home from './src/screens/Home';
import LoginScreen from './src/screens/LoginScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';
import PostsScreen from './src/screens/PostsScreen';
import { Feather } from '@expo/vector-icons';

export default function App() {
  const Stack = createStackNavigator();

  const handleLogout = () => {
    console.log('logout');
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        // screenOptions={{
        //   headerTitleContainerStyle: styles.headerStyle,
        // }}
      >
        <Stack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Posts"
          component={PostsScreen}
          options={{
            title: 'Публікації',
            headerTitleAlign: 'center',
            headerLeft: null,
            headerRight: () => (
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
              >
                <Feather
                  name="log-out"
                  size={24}
                  color="#BDBDBD"
                  style={styles.logoutIcon}
                />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButton: {
    marginRight: 16, // Відсунути іконку від правого боку на 16 пікселів
  },
  logoutIcon: {
    marginRight: 0, // Скинути внутрішній падінг іконки
  },
});
