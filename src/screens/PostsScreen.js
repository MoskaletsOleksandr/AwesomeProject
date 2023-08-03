import { Feather } from '@expo/vector-icons';
import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../hooks/use-auth';
import { useDispatch } from 'react-redux';
import { usePosts } from '../hooks/use-posts';
import { getAllPostsThunk } from '../redux/posts/thunks';

const PostsScreen = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { allPosts } = usePosts();

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { login, email, photo } = useAuth();

  useEffect(() => {
    dispatch(getAllPostsThunk());
  }, [dispatch]);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    dispatch(getAllPostsThunk());
    setIsRefreshing(false);
  }, [dispatch]);

  const handleOpenMapScreen = (location) => {
    navigation.navigate('MapScreen', { location });
  };

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
          <TouchableOpacity
            style={styles.postInfoWrapper}
            onPress={() =>
              navigation.navigate('Comments', { selectedPost: item })
            }
          >
            <Feather
              name="message-circle"
              size={24}
              color="#BDBDBD"
              style={styles.postInfoIcon}
            />
            <Text style={styles.postComments}>{item.comments.length}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.postInfoWrapper}
            onPress={() => {
              handleOpenMapScreen(item.mapLocation);
            }}
          >
            <Feather
              name="map-pin"
              size={24}
              color="#BDBDBD"
              style={styles.postInfoIcon}
            />
            <Text style={styles.postLocation}>{item.location}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Image
          style={styles.userImage}
          source={{ uri: photo }}
          resizeMode="cover"
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{login}</Text>
          <Text style={styles.userEmail}>{email}</Text>
        </View>
      </View>
      <FlatList
        data={allPosts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.postsContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
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
  postContent: {},
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
