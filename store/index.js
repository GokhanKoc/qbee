import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import { createLogger } from 'redux-logger';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';



// middleware that logs actions
const logger = createLogger({ predicate: (getState, action) => __DEV__  });


function configureStore() {
  const enhancer = compose(
    applyMiddleware(
      thunk,
      logger
    ),
    autoRehydrate()
  );
  return createStore(reducers, {}, enhancer);
}

const store = configureStore();

persistStore(store, { storage: AsyncStorage });

export default store;
