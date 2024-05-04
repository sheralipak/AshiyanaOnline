import { combineReducers, configureStore } from "@reduxjs/toolkit"; // Import combineReducers and configureStore functions from Redux Toolkit
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist"; // Import necessary functions and constants from redux-persist
import storage from "redux-persist/lib/storage"; // Import storage engine from redux-persist
import authSlice from "./authSlice"; // Import authSlice reducer

// Configuration for persisting the Redux store
const persistConfig = {
    key: "root", // Key for the root of the persisted state
    version: 1, // Version of the persisted state
    storage, // Storage engine (localStorage by default)
};

// Combine reducers
const reducers = combineReducers({
    auth: authSlice, // Include authSlice reducer in combineReducers
});

// Create persisted reducer using persistReducer
const persistedReducer = persistReducer(persistConfig, reducers);

// Create Redux store
export const store = configureStore({
    reducer: persistedReducer, // Set persistedReducer as the root reducer
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Ignore certain actions during serialization check
            },
        }),
});

// Create persistor for the store
export let persistor = persistStore(store);
