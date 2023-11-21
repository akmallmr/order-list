import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
};

export const utilSlice = createSlice({
  name: 'utils',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {setLoading, getCnTranslate} = utilSlice.actions;

export const isLoading = state => state.utils.loading;

export default utilSlice.reducer;
