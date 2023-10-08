import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const profileStateSlice = createSlice({
  name: 'profileState',
  initialState,
  reducers: {
    updateState: (state, action) => {
      state.value = action.payload;
      // state.interests = action.payload;
      console.log('state value:', state.value);
    },
  },
});

export const { updateState } = profileStateSlice.actions;
export default profileStateSlice.reducer;
