import { applyMiddleware, compose, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers/rootReducer';

const enhancers = [];
const middleware = [thunk,logger];

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

export default () => {
  const store = createStore(persistedReducer, {}, composedEnhancers);
  return { store, persistor: persistStore(store) };
}