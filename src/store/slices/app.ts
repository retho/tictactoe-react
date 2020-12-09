import {createSliceName, createSlice} from 'utils/redux';

const sliceName = createSliceName('app');

type State = {
  crashed: boolean;
};
const defaultState: State = {
  crashed: false,
};
const slice = createSlice({
  name: sliceName,
  initialState: defaultState,
  reducers: {
    reset: () => defaultState,
  },
});

export const {reducer} = slice;
export const {reset} = slice.actions;
