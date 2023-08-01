import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import PostsScreen from './PostsScreen';
import CreatePostsScreen from './CreatePostsScreen';
import ProfileScreen from './ProfileScreen';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { removeUser } from '../redux/user/userSlice';
import { auth } from '../config';

const Tabs = createBottomTabNavigator();

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        dispatch(removeUser());
        navigation.navigate('Login');
      })
      .catch((error) => {
        console.log('Logout error:', error);
      });
  };

  const handleGoBack = () => {
    navigation.navigate('Posts');
  };

  return (
    <Tabs.Navigator
      initialRouteName="Posts"
      screenOptions={({ route }) => ({
        tabBarStyle: route.name === 'Create' ? { display: 'none' } : {},
      })}
    >
      <Tabs.Screen
        name="Posts"
        component={PostsScreen}
        tabBarLabel={false}
        options={{
          title: 'Публікації',
          headerTitleAlign: 'center',
          tabBarShowLabel: false,
          tabBarIcon: () => (
            <View style={styles.gridIconContainer}>
              <Feather
                name="grid"
                size={24}
                color="#BDBDBD"
                style={styles.gridIcon}
              />
            </View>
          ),
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
      <Tabs.Screen
        name="Create"
        component={CreatePostsScreen}
        options={{
          tabBarShowLabel: false,
          title: 'Створити публікацію',
          headerTitleAlign: 'center',
          tabBarIcon: () => (
            <View style={styles.addButtonContainer}>
              <Feather
                name="plus"
                size={13}
                color="#FFFFFF"
                style={styles.addButtonIcon}
              />
            </View>
          ),

          headerLeft: () => (
            <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
              <Feather
                name="arrow-left"
                size={24}
                color="#BDBDBD"
                style={styles.backIcon}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,

          tabBarIcon: () => (
            <View style={styles.userIconContainer}>
              <Feather
                name="user"
                size={24}
                color="#BDBDBD"
                style={styles.userIcon}
              />
            </View>
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

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
  backButton: {
    marginLeft: 16,
  },
  backIcon: {
    marginLeft: 0,
    color: '#212121',
  },
  addButtonContainer: {
    height: 40,
    width: 70,
    borderRadius: 20,
    backgroundColor: '#FF6C00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonIcon: {
    marginLeft: 0,
  },
  userIcon: {
    marginLeft: 0,
  },
  userIconContainer: {
    marginEnd: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridIcon: {
    marginLeft: 0,
  },
  gridIconContainer: {
    marginStart: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
