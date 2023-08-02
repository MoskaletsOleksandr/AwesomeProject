import { db } from '../config';
import { collection, getDocs } from 'firebase/firestore';

export const fetchPosts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'posts'));

    const posts = [];

    querySnapshot.forEach((doc) => {
      posts.push(doc.data());
    });

    return posts;
  } catch (error) {
    console.error('Помилка при отриманні постів з Firebase:', error);
    throw error;
  }
};
