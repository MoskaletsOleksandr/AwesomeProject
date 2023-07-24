import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, TouchableOpacity } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';
import HomeScreen from './src/screens/HomeScreen';
import MapScreen from './src/screens/MapScreen';
import CreatePostsScreen from './src/screens/CreatePostsScreen';
import PostsScreen from './src/screens/PostsScreen';
import { Feather } from '@expo/vector-icons';
import CommentsScreen from './src/screens/CommentsScreen';

const Stack = createStackNavigator();

export default function App() {
  // const navigation = useNavigation();

  // const handleLogout = () => {
  //   navigation.navigate('Login');
  // };
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
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
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MapScreen"
          component={MapScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CreatePosts"
          component={CreatePostsScreen}
          options={{
            title: 'Створити публікацію',
            headerTitleAlign: 'center',
            // headerShown: false,
          }}
        />
        <Stack.Screen
          name="Comments"
          component={CommentsScreen}
          options={{
            title: 'Коментарі',
            headerTitleAlign: 'center',
            // headerShown: false,
          }}
        />
        {/* <Stack.Screen
          name="PostsScreen"
          component={PostsScreen}
          options={{
            title: 'Публікації',
            headerTitleAlign: 'center',
            // headerShown: false,
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
            headerLeft: () => null,
          }}
        /> */}
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
    marginRight: 16,
  },
  logoutIcon: {
    marginRight: 0,
  },
});
