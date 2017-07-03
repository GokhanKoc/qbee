import { combineReducers } from 'redux';
import auth from './auth';
import cards from './cards';
import chats from './cards';



export default combineReducers({
  auth, cards, chats
});
