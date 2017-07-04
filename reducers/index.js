import { combineReducers } from 'redux';
import auth from './auth';
import cards from './cards';
import chats from './chats';




const appReducer = combineReducers({
  /* your app’s top-level reducers */
  auth, cards, chats
})

export default rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined
  }

  return appReducer(state, action)
}
