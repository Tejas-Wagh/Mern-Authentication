import {combineReducers, configureStore} from "@reduxjs/toolkit"
import { userSlice } from "./userslice"
import {persistReducer,FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from "redux-persist"
import storage from "redux-persist/lib/storage"
import persistStore from "redux-persist/es/persistStore"
const rootReducer= combineReducers({
    user:userSlice.reducer,
})

const persistConfig={
    key:"root",
    version:1,
    storage,
}

const persistedReducer=persistReducer(persistConfig, rootReducer)

export const store= configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor= persistStore(store);