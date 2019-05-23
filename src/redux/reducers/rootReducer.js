import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import HomePhotoReducer from './HomePhotoReducer';

const authPersistConfig = {
    key: 'auth',
    storage
}
const homePersistConfig = {
    key: 'home',
    storage
}
export default combineReducers({
    auth: persistReducer(authPersistConfig, AuthReducer),
    home: persistReducer(homePersistConfig, HomePhotoReducer)
});