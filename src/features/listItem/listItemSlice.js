import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {setLoading} from '../utils/utilSlice';

const initialState = {
  listItem: [],
};

export const getListItem = createAsyncThunk(
  'listItem',
  async (_, {dispatch, rejectWithValue, getState}) => {
    dispatch(setLoading(true));
    const token = getState().auth.account.access_token;
    const idState = getState().auth.uuid;
    console.log('token getListOrder', token);
    console.log('idState getListOrder', idState);
    let myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + token);
    myHeaders.append('state', '12345');
    myHeaders.append(
      'Content-Type',
      'application/x-www-form-urlencoded;charset=UTF-8',
    );
    const response = await fetch(
      'https://dev.profescipta.co.id/so-api/Order/GetItems',
      {
        method: 'GET',
        headers: myHeaders,
      },
    );
    const resJson = await response.json();
    console.log('getListItem', resJson);
    if (resJson) {
      dispatch(setLoading(false));
      return resJson;
    } else {
      dispatch(setLoading(false));
      return rejectWithValue(resJson);
    }
  },
);

export const listItemSlice = createSlice({
  name: 'listItem',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getListItem.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getListItem.fulfilled, (state, action) => {
      state.loading = false;
      console.log('state listitem', action.payload);
      state.listItem = action.payload;
    });
    builder.addCase(getListItem.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export const {} = listItemSlice.actions;

export default listItemSlice.reducer;
