// eslint-disable-next-line no-restricted-imports
import {configureStore, Action, getDefaultMiddleware} from '@reduxjs/toolkit';
import {reducer} from './root';
import {ThunkAction} from 'redux-thunk';
import {genRequest, Requester} from 'utils/request';

const thunkExtraArgument = {
  request: (null as unknown) as Requester,
};

const store = configureStore({
  reducer,
  middleware: [
    ...getDefaultMiddleware({
      thunk: {extraArgument: thunkExtraArgument},
      immutableCheck: true,
      serializableCheck: true,
    }),
  ],
});
thunkExtraArgument.request = genRequest(store);

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./root', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const {reducer: newRootReducer} = require('./root').default;
    store.replaceReducer(newRootReducer);
  });
}

export type AppStore = typeof store;
export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<R = void> = ThunkAction<
  R,
  RootState,
  typeof thunkExtraArgument,
  Action<string>
>;

export default store;
