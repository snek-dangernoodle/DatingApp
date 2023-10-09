import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  password: '',
  isAuthenticated: false,
};

export const loginSlice = createSlice({
  name: 'loginState',
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
export const { setUsername, setPassword, setAuthenticated } =
  loginSlice.actions;
export default loginSlice.reducer;
