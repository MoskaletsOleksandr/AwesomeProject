import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import PostsScreen from './PostsScreen';
import CreatePostsScreen from './CreatePostsScreen';
import ProfileScreen from './ProfileScreen';

const Tabs = createBottomTabNavigator();

const handleLogout = () => {
  console.log('logout');
};

const HomeScreen = () => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen
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
      <Tabs.Screen name="Create" component={CreatePostsScreen} />
      <Tabs.Screen name="Profile" component={ProfileScreen} />
    </Tabs.Navigator>
  );
};

export default HomeScreen;
