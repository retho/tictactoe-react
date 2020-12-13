import {createSliceName, createSlice, PayloadAction} from 'utils/redux';
import {AppThunk} from 'store';
import {loginReq} from 'api/auth';
import {notifyError} from 'utils/toastify';

const sliceName = createSliceName('auth');

type State = {
  token: null | string;
};
const defaultState: State = {
  token: null,
};
const slice = createSlice({
  name: sliceName,
  initialState: {...defaultState, token: localStorage.getItem('token')},
  reducers: {
    reset: () => defaultState,
    setToken: (state, {payload}: PayloadAction<null | string>) => ({
      ...state,
      token: payload,
    }),
  },
});

export const {reducer} = slice;
export const {reset} = slice.actions;
const {setToken} = slice.actions;

export const login = (username: string): AppThunk => async (dispatch, getState, {request}) => {
  const reply = await request(loginReq(username));
  if (reply.kind === 'success') {
    localStorage.setItem('token', reply.data.token);
    dispatch(setToken(reply.data.token));
  } else if (reply.kind !== 'unauthorized') {
    notifyError('Something went wrong');
  }
};

export const logoutForce = (): AppThunk => async dispatch => {
  localStorage.clear();
  dispatch(setToken(null));
};
