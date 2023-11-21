import {configureStore, combineReducers} from '@reduxjs/toolkit';

import AsyncStorage from '@react-native-async-storage/async-storage';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import thunk from 'redux-thunk';

import authSlice from '../features/auth/authSlice';
import utilSlice from '../features/utils/utilSlice';
import listOrderSlice from '../features/listOrder/listOrderSlice';
import listItemSlice from '../features/listItem/listItemSlice';

const rootReducers = combineReducers({
  auth: authSlice,
  listItem: listItemSlice,
  listOrder: listOrderSlice,
  util: utilSlice,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
