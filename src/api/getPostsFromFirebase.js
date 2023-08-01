import { db } from '../config';
import { collection, getDocs } from 'firebase/firestore';

// Функція для отримання всіх постів з Firebase
export const fetchPosts = async () => {
  console.log('fetchPosts');
  try {
    // Отримуємо всі документи з колекції "posts"
    const querySnapshot = await getDocs(collection(db, 'posts'));

    // Створюємо порожній масив для збереження постів
    const posts = [];

    // Проходимося по кожному документу та додаємо його дані до масиву постів
    querySnapshot.forEach((doc) => {
      posts.push(doc.data());
    });

    // Повертаємо масив з постами
    return posts;
  } catch (error) {
    // Обробляємо помилки, якщо є
    console.error('Помилка при отриманні постів з Firebase:', error);
    throw error;
  }
};
