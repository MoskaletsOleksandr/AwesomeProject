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
    const commentAlign = isAuthorComment ? 'flex-end' : 'flex-start';
    const commentBackground = isAuthorComment ? '#E8F5E9' : '#F5F5F5';
    const commentColor = isAuthorComment ? '#2E7D32' : '#212121';

    return (
      <View style={[styles.commentContainer, { alignSelf: commentAlign }]}>
        <View
          style={[styles.commentBubble, { backgroundColor: commentBackground }]}
        >
          <Text style={[styles.commentText, { color: commentColor }]}>
            {comment.text}
          </Text>
          <Text style={styles.commentDate}>
            {comment.createdAt.toLocaleString()}
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
            placeholder="Add a comment..."
            value={newComment}
            onChangeText={setNewComment}
          />
          <TouchableOpacity
            style={styles.addCommentButton}
            onPress={handleAddComment}
          >
            <Feather name="arrow-up-circle" size={24} color="#FF6C00" />
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
    paddingBottom: 32,
    backgroundColor: '#fff',
  },
  postImage: {
    width: '100%',
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  commentContainer: {
    marginVertical: 8,
  },
  commentBubble: {
    padding: 8,
    borderRadius: 16,
    maxWidth: '70%',
  },
  commentText: {
    fontSize: 16,
  },
  commentDate: {
    fontSize: 12,
    color: '#BDBDBD',
    alignSelf: 'flex-end',
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#E8E8E8',
    paddingTop: 8,
  },
  commentInput: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    paddingHorizontal: 16,
    marginRight: 8,
  },
  addCommentButton: {
    padding: 8,
  },
});

export default CommentsScreen;
