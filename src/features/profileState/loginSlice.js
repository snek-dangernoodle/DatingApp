import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  password: '',
  isAuthenticated: false,
};

export const login = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});
export const { setUsername, setPassword, setAuthenticated } = login.actions;
export default login.reducer;
