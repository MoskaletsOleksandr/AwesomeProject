import { collection, addDoc, setDoc } from 'firebase/firestore';
import { db } from '../config';

export const addPostsToFirebase = async (post) => {
  try {
    const docRef = await addDoc(collection(db, 'posts'), post);

    const postId = docRef.id;
    post.id = postId;

    await setDoc(docRef, post);
  } catch (error) {
    console.error('Помилка при додаванні постів у Firebase:', error);
  }
};
