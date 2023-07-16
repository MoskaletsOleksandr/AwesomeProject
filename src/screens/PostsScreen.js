import { Feather } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import postsData from '../data/postsData';

const PostsScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.postContainer}>
      <Image
        style={styles.postImage}
        source={{ uri: item.image }}
        resizeMode="cover"
      />
      <View style={styles.postContent}>
        <Text style={styles.postTitle}>{item.title}</Text>
        <View style={styles.postInfo}>
          <View style={styles.postInfoWrapper}>
            <Feather
              name="message-circle"
              size={24}
              color="#BDBDBD"
              style={styles.postInfoIcon}
            />
            <Text style={styles.postComments}>{item.comments.length}</Text>
          </View>
          <View style={styles.postInfoWrapper}>
            <Feather
              name="map-pin"
              size={24}
              color="#BDBDBD"
              style={styles.postInfoIcon}
            />
            <Text style={styles.postLocation}>{item.location}</Text>
          </View>
        </View>
      </View>
    </View>
  );

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
      <FlatList
        data={postsData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.postsContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 32,
    backgroundColor: '#fff',
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
  postsContainer: {
    padding: 0,
  },
  postContainer: {
    flexDirection: 'column',
    marginBottom: 32,
  },
  postComments: {
    color: '#BDBDBD',
    fontSize: 16,
    fontWeight: 'regular',
  },
  postInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  postInfoIcon: {},
  postInfoWrapper: { flexDirection: 'row', gap: 6 },
  postImage: {
    width: '100%',
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  postContent: {
    // marginLeft: 8,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'medium',
    color: '#212121',
    marginBottom: 8,
  },
  postLocation: {
    fontSize: 16,
    color: '#212121',
    fontWeight: 'regular',
    textDecorationLine: 'underline',
  },
});

export default PostsScreen;
