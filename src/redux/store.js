import { configureStore } from '@reduxjs/toolkit'
import {activeBoardReducer} from './activeBoard/activeBoardSlice'
import { userReducer } from './user/userSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import { combineReducers } from 'redux'
import { activeCardReducer } from './activeCard/activeCardSlice'
//Cau hinh persist
const rootPersistConfig = {
  key: 'root',
  storage: storage, //luu vao localstorage
  whitelist: ['user'] //dinh nghia cac slice du lieu dc phep duy tri qua moi lan f5 trinh duyet
}

//Combine cac reducers trong du an cua chung ta tai day
const reducers = combineReducers({
  activeBoard: activeBoardReducer,
  user: userReducer,
  activeCard: activeCardReducer
})

//Thuc hien persist Reducer
const persistedReducers = persistReducer(rootPersistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducers,
  //Fix warning error when implement redux-persist
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})
