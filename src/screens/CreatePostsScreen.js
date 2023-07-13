import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const CreatePostsScreen = () => {
  const handleCreatePost = () => {
    // Логіка створення поста
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Введіть текст поста"
        multiline
      />
      <Button title="Створити пост" onPress={handleCreatePost} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    width: '100%',
    height: 150,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
});

export default CreatePostsScreen;
