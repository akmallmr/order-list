import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {setLoading} from '../utils/utilSlice';

const initialState = {
  listOrder: [],
};

export const getListOrder = createAsyncThunk(
  'listOrder',
  async (_, {dispatch, rejectWithValue, getState}) => {
    dispatch(setLoading(true));
    const token = getState().auth.account.access_token;
    console.log('token getListOrder', token);
    let myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + token);
    myHeaders.append(
      'Content-Type',
      'application/x-www-form-urlencoded;charset=UTF-8',
    );
    const response = await fetch(
      'https://dev.profescipta.co.id/so-api/Order/GetOrderList',
      {
        method: 'GET',
        headers: myHeaders,
      },
    );
    const resJson = await response.json();
    console.log('getListOrder', resJson);
    if (resJson) {
      dispatch(setLoading(false));
      return resJson;
    } else {
      dispatch(setLoading(false));
      return rejectWithValue(resJson);
    }
  },
);

export const listOrderSlice = createSlice({
  name: 'listOrder',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getListOrder.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getListOrder.fulfilled, (state, action) => {
      state.loading = false;
      console.log('state listorder', action.payload);
      state.listOrder = action.payload;
    });
    builder.addCase(getListOrder.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export const {} = listOrderSlice.actions;

export default listOrderSlice.reducer;
