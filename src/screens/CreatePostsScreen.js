import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

const CreatePostsScreen = () => {
  const [postText, setPostText] = useState('');
  const [location, setLocation] = useState('');
  const [photo, setPhoto] = useState(null);

  const isTrashButtonDisabled = !photo;

  const handleCreatePost = () => {
    if (!postText || !location || !photo) {
      // Логіка обробки помилки, якщо не всі дані заповнені
      return;
    }

    // Логіка створення поста
    console.log('Створено новий пост:', {
      title: postText,
      location,
      photo,
    });

    // Скидання полів вводу після створення поста
    setPostText('');
    setLocation('');
    setPhoto(null);
  };

  const handlePhotoUpload = (selectedPhoto) => {
    setPhoto(selectedPhoto);
  };

  const handleDeletePhoto = () => {
    setPhoto(null);
  };
  const isButtonDisabled = !postText || !location || !photo;

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
        handlePhotoUpload(selectedPhotoUri);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.photoUploadContainer}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.postImg} />
        ) : (
          <TouchableOpacity
            onPress={handleImagePicker}
            style={styles.uploadButton}
          >
            <Feather name="camera" size={30} color="#BDBDBD" />
          </TouchableOpacity>
        )}
      </View>
      {!photo ? (
        <Text style={styles.uploadText}>Завантажте фото</Text>
      ) : (
        <TouchableOpacity onPress={handleImagePicker}>
          <Text style={styles.uploadText}>Редагувати фото</Text>
        </TouchableOpacity>
      )}
      <TextInput
        style={styles.input}
        placeholder="Назва..."
        value={postText}
        onChangeText={setPostText}
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
        style={[styles.button, isButtonDisabled && styles.disabledButton]}
        onPress={handleCreatePost}
        disabled={isButtonDisabled}
      >
        <Text
          style={[
            styles.buttonText,
            isButtonDisabled && styles.disabledButtonText,
          ]}
        >
          Опублікувати
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
  uploadButton: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    // marginTop: '50%',
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
    position: 'relative',
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
