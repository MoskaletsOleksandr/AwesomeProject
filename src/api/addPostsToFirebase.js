import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { db } from '../config';

export const addPostsToFirebase = async (post) => {
  console.log('addPostsToFirebase');
  try {
    // Додаємо кожен пост окремо у колекцію "posts" у Firebase Firestore
    const docRef = await addDoc(collection(db, 'posts'), post);
    console.log('Додано новий документ з ID:', docRef.id);
  } catch (error) {
    console.error('Помилка при додаванні постів у Firebase:', error);
  }
};
