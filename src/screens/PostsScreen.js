import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const PostsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Image
          style={styles.userImage}
          source={{ uri: 'https://via.placeholder.com/60x60' }}
          resizeMode="cover"
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userEmail}>johndoe@example.com</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 32,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  userInfo: {
    marginLeft: 8,
  },
  userName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#212121',
  },
  userEmail: {
    fontSize: 11,
    color: '#212121',
  },
});

export default PostsScreen;
