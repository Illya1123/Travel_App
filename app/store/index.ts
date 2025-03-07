import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux';
import exampleReducer from '../slices/exampleSlice'
import userReducer from '../slices/userSlice'
import themeReducer from '../slices/themeSlice'
import tourReducer from '../slices/tourSlice';

export const store = configureStore({
  reducer: {
    example: exampleReducer,
    user: userReducer,
    theme: themeReducer,
    tour: tourReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store