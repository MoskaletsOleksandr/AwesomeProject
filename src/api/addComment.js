import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../config';

export const updateCommentsInPost = async (docId, comments) => {
  try {
    const postRef = doc(db, 'posts', docId);

    await updateDoc(postRef, { comments });
  } catch (error) {
    console.error('Помилка при оновленні коментарів:', error);
  }
};
