import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const authPersistConfig = {
    key: 'auth',
    storage
}
export default combineReducers({
    auth: persistReducer(authPersistConfig, AuthReducer)
});