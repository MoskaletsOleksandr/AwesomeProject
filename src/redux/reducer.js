import { combineReducers } from 'redux';
import { userReducer } from './user/userSlice';
import { postsReducer } from './posts/postsSlise';

const rootReducer = combineReducers({
  user: userReducer,
  posts: postsReducer,
});

export default rootReducer;
