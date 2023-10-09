import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [{ username: 'Wei', interest: 'D4' }],
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

export const updateStateAsync = (givenState) => (dispatch) => {
  setTimeout(() => {
    dispatch(updateState(givenState));
  }, 1000);
};

export const { updateState } = profileStateSlice.actions;
export const selectState = (state) => state.updateState.value;
export default profileStateSlice.reducer;
