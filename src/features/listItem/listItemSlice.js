import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {setLoading} from '../utils/utilSlice';

const initialState = {
  listItem: [],
  isModal: false,
};

export const getListItem = createAsyncThunk(
  'listItem/get',
  async (_, {dispatch, rejectWithValue, getState}) => {
    dispatch(setLoading(true));
    const token = getState().auth.account.access_token;
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

export const createListItem = createAsyncThunk(
  'listItem/create',
  async (body, {dispatch, rejectWithValue, getState}) => {
    dispatch(setLoading(true));
    const token = getState().auth.account.access_token;
    console.log('token getListOrder', token);
    const data = new URLSearchParams();
    data.append('ItemId', body.ItemId);
    data.append('OrderId', body.OrderId);
    data.append('ItemName', body.ItemName);
    data.append('Quantity', body.Quantity);
    data.append('Price', body.Price);

    let myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + token);
    myHeaders.append('state', '12345');
    myHeaders.append(
      'Content-Type',
      'application/x-www-form-urlencoded;charset=UTF-8',
    );
    console.log('data', data);
    const response = await fetch(
      'https://dev.profescipta.co.id/so-api/Order/CreateItem',
      {
        method: 'POST',
        headers: myHeaders,
        body: data.toString(),
      },
    );
    const resJson = await response.json();
    console.log('createListItem', resJson);
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
  reducers: {
    setModal: (state, action) => {
      state.isModal = action.payload;
    },
  },
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
    builder.addCase(createListItem.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createListItem.fulfilled, (state, action) => {
      state.loading = false;
      console.log('state createListItem', action.payload);
    });
    builder.addCase(createListItem.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export const {setModal} = listItemSlice.actions;

export default listItemSlice.reducer;
