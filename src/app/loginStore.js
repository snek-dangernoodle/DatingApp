import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../features/profileState/loginSlice';

export const loginStore = configureStore({
    reducer: {
      login: loginReducer
    },
  });
  