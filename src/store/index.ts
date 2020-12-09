// eslint-disable-next-line no-restricted-imports
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {reducer} from './root';

const store = configureStore({
  reducer,
  middleware: [
    ...getDefaultMiddleware({ thunk: true, immutableCheck: false, serializableCheck: false }),
  ],
});

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
