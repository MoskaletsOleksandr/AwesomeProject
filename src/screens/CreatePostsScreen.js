import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

const CreatePostsScreen = () => {
  const [postText, setPostText] = useState('');
  const [location, setLocation] = useState('');
  const [photo, setPhoto] = useState(null);

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

  const isButtonDisabled = !postText || !location || !photo;

  return (
    <View style={styles.container}>
      <View style={styles.photoUploadContainer}>
        {/* Компонент для завантаження фото */}
      </View>
      <Text style={styles.uploadText}>Завантажте фото</Text>
      <TextInput
        style={styles.input}
        placeholder="Назва..."
        value={postText}
        onChangeText={setPostText}
      />
      <TextInput
        style={styles.input}
        placeholder="Місцевість"
        value={location}
        onChangeText={setLocation}
      />
      <Button
        title="Опублікувати"
        onPress={handleCreatePost}
        disabled={isButtonDisabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    paddingTop: 32,
  },
  photoUploadContainer: {
    width: '100%',
    height: 240,
    backgroundColor: '#F6F6F6',
    marginBottom: 16,
    borderColor: '#E8E8E8',
  },
  uploadText: {
    fontSize: 16,
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
});

export default CreatePostsScreen;
