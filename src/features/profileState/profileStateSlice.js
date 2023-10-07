import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  interests: [],
};

export const profileStateSlice = createSlice({
  name: 'profileState',
  initialState,
  reducers: {
    updateState: (state, action) => {
      state.username = action.payload.username;
      state.interests = action.payload.interests;
    },
  },
});

export const { updateState } = profileStateSlice.actions;
export default profileStateSlice.reducer;
