import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';

const CommentsScreen = ({ route }) => {
  const { selectedPost } = route.params;
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(selectedPost.comments);

  const renderComment = (comment) => {
    const isAuthorComment = comment.author === 'Admin';
    const commentDirection = !isAuthorComment ? 'row' : 'row-reverse';
    const dateAlign = !isAuthorComment ? 'flex-end' : 'flex-start';
    // const commentBackground = isAuthorComment ? '#E8F5E9' : '#F5F5F5';
    // const commentColor = isAuthorComment ? '#2E7D32' : '#212121';

    return (
      <View
        style={[styles.commentContainer, { flexDirection: commentDirection }]}
      >
        <Image
          style={styles.authorImage}
          source={{ uri: 'https://via.placeholder.com/28x28' }}
          resizeMode="cover"
        />
        <View style={styles.commentBubble}>
          <Text
            style={[
              styles.commentText,
              // , { color: commentColor }
            ]}
          >
            {comment.text}
          </Text>
          <Text style={[styles.commentDate, { alignSelf: dateAlign }]}>
            {comment.createdAt}
          </Text>
        </View>
      </View>
    );
  };

  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      const newCommentData = {
        id: comments.length + 1,
        text: newComment,
        author: 'Admin', // Змініть на ім'я поточного користувача
        createdAt: new Date().toLocaleString(),
      };
      setComments([...comments, newCommentData]);
      setNewComment('');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image
          style={styles.postImage}
          source={{ uri: selectedPost.image }}
          resizeMode="cover"
        />
        {comments.map((comment) => (
          <React.Fragment key={comment.id}>
            {renderComment(comment)}
          </React.Fragment>
        ))}
      </ScrollView>
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.commentInputContainer}>
          <TextInput
            style={styles.commentInput}
            placeholder="Коментувати..."
            value={newComment}
            onChangeText={setNewComment}
          />
          <TouchableOpacity
            style={styles.addCommentButton}
            onPress={handleAddComment}
          >
            <Feather name="arrow-up" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 16,
    backgroundColor: '#fff',
  },
  postImage: {
    width: '100%',
    height: 240,
    borderRadius: 8,
    marginBottom: 32,
  },
  commentContainer: {
    gap: 16,
    marginBottom: 24,
  },
  commentBubble: {
    backgroundColor: '#f7f7f7',
    padding: 16,
    flex: 1,
  },
  commentText: {
    fontFamily: 'Roboto',
    fontSize: 13,
    lineHeight: 18,
    color: '#212121',
    marginBottom: 8,
  },
  commentDate: {
    fontFamily: 'Roboto',
    fontSize: 10,
    color: '#BDBDBD',
  },
  commentInputContainer: {},
  commentInput: {
    height: 50,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    paddingHorizontal: 16,
    backgroundColor: '#F6F6F6',
  },
  addCommentButton: {
    position: 'absolute',
    height: 34,
    width: 34,
    backgroundColor: '#FF6C00',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    top: 8,
    right: 8,
  },
  authorImage: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
});

export default CommentsScreen;
