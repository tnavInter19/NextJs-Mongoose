// src/redux/store.ts
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage/session"; // Use localStorage as the storage engine
import thunkMiddleware from "redux-thunk";
import authReducer, { AuthState } from "./reducers/authreducer";
import counterReducer, { CounterState } from "./reducers/counter";

// Root reducer
const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authReducer,
});

// Define the root state type
export interface RootState {
  counter: CounterState;
  auth: AuthState;
}

// Middleware configuration, including Redux Thunk and Redux Persist
const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: false, // Disable serializableCheck for Redux Persist
  }),
  thunkMiddleware,
];

// Redux DevTools Extension setup
const devTools =
  (process.browser &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()) ||
  null;

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store
export const store = configureStore({
  reducer: persistedReducer,
  middleware,
  devTools: devTools, // Pass the Redux DevTools extension
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Export persistor to enable Redux Persist
export const persistor = persistStore(store);
