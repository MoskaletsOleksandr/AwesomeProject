import { AntDesign, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import postsData from '../data/postsData';

const ProfileScreen = () => {
  const { height } = Dimensions.get('window');
  const navigation = useNavigation();

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  const renderItem = ({ item }) => (
    <View style={styles.postContainer} key={item.id}>
      <Image
        style={styles.postImage}
        source={{ uri: item.image }}
        resizeMode="cover"
      />
      <View style={styles.postContent}>
        <Text style={styles.postTitle}>{item.title}</Text>
        <View style={styles.postInfo}>
          <View style={styles.postAllInfoWrapper}>
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
                name="thumbs-up"
                size={24}
                color="#BDBDBD"
                style={styles.postInfoIcon}
              />
              <Text style={styles.postComments}>{item.likes}</Text>
            </View>
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
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <ImageBackground
          style={[styles.background, { height }]}
          source={require('../assets/main-bg.png')}
          resizeMode="cover"
        />
        <View style={styles.profileContainer}>
          <View style={styles.userImg}>
            <TouchableOpacity>
              <AntDesign
                name="pluscircleo"
                size={25}
                color="#FF6C00"
                style={styles.plusIcon}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Feather
              name="log-out"
              size={24}
              color="#BDBDBD"
              style={styles.logoutIcon}
            />
          </TouchableOpacity>
          <Text style={styles.profileName}>Natali Romanova</Text>
          {postsData.map((item) => renderItem({ item, key: item.id }))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    alignItems: 'center',
    // flex: 1,
    width: '100%',
    // height: '100%',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // height: '100%',
    // width: '100%',
    flex: 1,
  },
  profileContainer: {
    width: '100%',
    marginTop: 147,
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 92,
    paddingBottom: 43,
    backgroundColor: '#fff',
    borderRadius: 25,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  profileName: {
    color: '#212121',
    fontSize: 30,
    fontWeight: '600',
    marginBottom: 34,
    alignSelf: 'center',
  },
  postContainer: {
    flexDirection: 'column',
    marginBottom: 32,
  },
  postImage: {
    width: '100%',
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  postContent: {},
  postTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 8,
  },
  postInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  postInfoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  postAllInfoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  postInfoIcon: {},
  postComments: {
    color: '#BDBDBD',
    fontSize: 16,
    fontWeight: '400',
  },
  postLocation: {
    fontSize: 16,
    color: '#212121',
    fontWeight: '400',
    textDecorationLine: 'underline',
  },
  plusIcon: {
    position: 'absolute',
    right: -12,
    top: 81,
    transform: [{ rotate: '45deg' }],
    color: '#BDBDBD',
  },
  userImg: {
    alignSelf: 'center',
    position: 'absolute',
    top: -60,
    borderRadius: 16,
    backgroundColor: '#F6F6F6',
    width: 120,
    height: 120,
  },
  logoutButton: {
    position: 'absolute',
    top: 22,
    right: 16,
  },
  logoutIcon: {
    marginRight: 0,
  },
});

export default ProfileScreen;
