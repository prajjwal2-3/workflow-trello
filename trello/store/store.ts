import { configureStore } from '@reduxjs/toolkit';
import cardsReducer from './cardslice';
import userReducer from './userslice';

export const store = configureStore({
  reducer: {
    cards: cardsReducer,
    user: userReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;