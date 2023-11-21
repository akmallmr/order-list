import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {setLoading} from '../utils/utilSlice';
import uuid from 'react-native-uuid';

const initialState = {
  loading: false,
  account: {},
  uuid: '',
};

export const signIn = createAsyncThunk(
  'auth',
  async (_, {dispatch, rejectWithValue}) => {
    dispatch(setLoading(true));
    const data = new URLSearchParams();
    data.append('client_id', 'profes-api');
    data.append('client_secret', 'P@ssw0rd');
    data.append('grant_type', 'client_credentials');
    const response = await fetch('https://dev.profescipta.co.id/so-api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: data.toString(),
    });
    const resJson = await response.json();
    // console.log('resJson', resJson);
    if (resJson.access_token) {
      dispatch(setLoading(false));
      return resJson;
    } else {
      dispatch(setLoading(false));
      return rejectWithValue(resJson);
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(signIn.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.loading = false;
      state.account = action.payload;
      state.uuid = uuid.v4();
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
