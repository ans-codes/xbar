import AsyncStorage from '@react-native-community/async-storage';
import {createStore, combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import userReducer from './User/reducer';
import cartItems from "./cart/reducer";

const rootReducers = combineReducers({user: userReducer,cartItems:cartItems});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user','cartItems'],
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducers);
const store = createStore(persistedReducer);
const persistor = persistStore(store);
export {store, persistor};
