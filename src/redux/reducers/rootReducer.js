import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import HomePhotoReducer from './HomePhotoReducer';
import ProfileReducer from './ProfileReducer';
import CollectionsReducer from './CollectionsReducer';
import SearchReducer from './SearchReducer';

const authPersistConfig = {
    key: 'auth',
    storage
}
const homePersistConfig = {
    key: 'home',
    storage
}
const userPersistConfig = {
    key: 'user',
    storage
}
const collectionsPersistConfig = {
    key: 'collections',
    storage
}
const searchPersistConfig = {
    key: 'search',
    storage
}
export default combineReducers({
    auth: persistReducer(authPersistConfig, AuthReducer),
    home: persistReducer(homePersistConfig, HomePhotoReducer),
    user: persistReducer(userPersistConfig, ProfileReducer),
    collections: persistReducer(collectionsPersistConfig, CollectionsReducer),
    search: persistReducer(searchPersistConfig, SearchReducer)

});