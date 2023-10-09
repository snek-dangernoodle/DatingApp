import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const profileStateSlice = createSlice({
  name: 'profileState',
  initialState,
  reducers: {
    updateState: (state, action) => {
      //Setting the state to the the input which is the result from preference.jsx @line 25
      state.value = action.payload;
    },
  },
});

export const updateStateAsync = (givenState) => async (dispatch) => {

  //Async dispatch update State
  const result = await dispatch(updateState(givenState));
};

export const { updateState } = profileStateSlice.actions;
export const selectState = (state) => state.updateState.value;
export default profileStateSlice.reducer;
