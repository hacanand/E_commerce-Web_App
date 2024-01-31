 
import categoryReducer from './categorySlice'
import cartReducer from './cartSlice'
import storage from 'redux-persist/lib/storage'
 
import {
  combineReducers,
  configureStore,
 
} from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
 
 

  const persistConfig = {
    key:'root',
    storage,  
  }
  const rootReducer = combineReducers({
    categoryReducer,
    cartReducer,
  })
  const persistedReducer = persistReducer(persistConfig,rootReducer)
  export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),

    devTools: process.env.NODE_ENV !== "production",
  });
  export const persistor = persistStore(store)

 

 