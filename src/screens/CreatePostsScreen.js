import * as ImagePicker from 'expo-image-picker';
import { storage } from '../config';
import { Feather } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Camera, CameraType } from 'expo-camera';
import * as Location from 'expo-location';
import { useDispatch } from 'react-redux';
import { createNewPostThunk } from '../redux/posts/thunks';
import { useAuth } from '../hooks/use-auth';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const CreatePostsScreen = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [locationAddress, setLocationAddress] = useState(null);
  const [title, setTitle] = useState('');
  const [photo, setPhoto] = useState(null);
  const cameraRef = useRef(null);
  const [location, setLocation] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { id: postAuthor } = useAuth();

  const isTrashButtonDisabled = !photo;
  const isButtonDisabled = !title || !location || !photo;
  const apiKey = 'AIzaSyAO-LkeE_0Q_ZX0hml-eE9mz0_16AnCzQ8';

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return;
    }

    const { coords } = await Location.getCurrentPositionAsync({});

    setLatitude(coords.latitude);
    setLongitude(coords.longitude);
  };

  const getLocationAddress = async () => {
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    try {
      const response = await fetch(geocodeUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data.status === 'OK' && data.results.length > 0) {
        const address = data.results[0].formatted_address;
        setLocationAddress(address);
      } else {
        console.log('Не вдалося знайти адресу для цих координат.');
        setLocationAddress('Невідома локація');
      }
    } catch (error) {
      console.log('Помилка при виконанні запиту:', error);
      setLocationAddress('Невідома локація');
    }
  };

  const handleCreatePost = async () => {
    if (!title || !location || !photo) {
      return;
    }

    try {
      setIsUploading(true);

      await getLocationAddress();

      const response = await fetch(photo);
      const blob = await response.blob();

      const uniqueId = `${postAuthor}-${Date.now()}`;
      const storageRef = ref(storage, `posts/${uniqueId}`);
      const snapshot = await uploadBytes(storageRef, blob);

      const downloadURL = await getDownloadURL(snapshot.ref);

      const data = {
        createdAt: Date.now(),
        comments: [],
        image: downloadURL,
        likes: 0,
        location,
        locationAddress,
        mapLocation: {
          latitude,
          longitude,
        },
        postAuthor,
        title,
      };

      await dispatch(createNewPostThunk(data));

      setTitle('');
      setLocation(null);
      setPhoto(null);
      setLocationAddress(null);

      setIsUploading(false);

      navigation.navigate('Posts');
    } catch (error) {
      console.log('Помилка при завантаженні фотографії:', error.message);
    }
  };

  const handleTakePhoto = async () => {
    try {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        console.log('Не надано дозвіл на доступ до камери');
        return;
      }

      if (cameraRef.current) {
        const options = { quality: 1 };
        const data = await cameraRef.current.takePictureAsync(options);
        if (!data.cancelled) {
          setPhoto(data.uri); // Зберігаємо фотографію у стані `photo`
          await getLocation();
        }
      }
    } catch (error) {
      console.log('Помилка при зйомці фото:', error);
    }
  };

  const handleDeletePhoto = () => {
    setPhoto(null);
  };

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const { assets } = result;
      if (assets && assets.length > 0) {
        const selectedPhotoUri = assets[0].uri;
        setPhoto(selectedPhotoUri);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.photoUploadContainer}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.postImg} />
        ) : (
          <Camera style={styles.camera} type={CameraType.back} ref={cameraRef}>
            <TouchableOpacity
              onPress={handleTakePhoto}
              style={styles.uploadButton}
            >
              <Feather name="camera" size={30} color="#BDBDBD" />
            </TouchableOpacity>
          </Camera>
        )}
      </View>
      {photo ? (
        <Text style={styles.uploadText}>Редагувати фото</Text>
      ) : (
        <TouchableOpacity onPress={handleImagePicker}>
          <Text style={styles.uploadText}>Завантажте фото</Text>
        </TouchableOpacity>
      )}
      <TextInput
        style={styles.input}
        placeholder="Назва..."
        value={title}
        onChangeText={setTitle}
      />
      <View style={styles.inputWrapper}>
        <Feather
          name="map-pin"
          size={24}
          color="#BDBDBD"
          style={styles.postInfoIcon}
        />
        <TextInput
          style={[styles.input, { paddingLeft: 28 }]}
          placeholder="Місцевість..."
          value={location}
          onChangeText={setLocation}
        />
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          isButtonDisabled || isUploading ? styles.disabledButton : null,
        ]}
        onPress={handleCreatePost}
        disabled={isButtonDisabled || isUploading}
      >
        <Text
          style={[
            styles.buttonText,
            isButtonDisabled || isUploading ? styles.disabledButtonText : null,
          ]}
        >
          {isUploading ? 'Завантаження...' : 'Опублікувати'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleDeletePhoto}
        style={[
          styles.trashButton,
          isTrashButtonDisabled && styles.disabledButton,
        ]}
      >
        <Feather name="trash-2" size={24} color="#BDBDBD" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 32,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    backgroundColor: '#FF6C00',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 100,
    marginTop: 38,
  },
  disabledButton: {
    backgroundColor: '#F6F6F6',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#fff',
  },
  disabledButtonText: { color: '#BDBDBD' },
  photoUploadContainer: {
    width: '100%',
    height: 240,
    backgroundColor: '#F6F6F6',
    marginBottom: 8,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
  },
  camera: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  uploadButton: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    opacity: 0.3,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  postInfoIcon: {
    position: 'absolute',
    top: 13,
  },
  uploadText: {
    fontSize: 16,
    marginBottom: 32,
    color: '#BDBDBD',
  },
  input: {
    width: '100%',
    height: 50,
    borderBottomWidth: 1,
    borderColor: '#E8E8E8',
    paddingVertical: 16,
    marginBottom: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
  },
  trashButton: {
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF6C00',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
  },
  postImg: {
    width: '100%',
    height: '100%',
  },
});

export default CreatePostsScreen;
