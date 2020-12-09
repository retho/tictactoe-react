// eslint-disable-next-line no-restricted-imports
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {reducer} from './root';

const store = configureStore({
  reducer,
  middleware: [
    ...getDefaultMiddleware({thunk: true, immutableCheck: true, serializableCheck: true}),
  ],
});

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./root', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const {reducer: newRootReducer} = require('./root').default;
    store.replaceReducer(newRootReducer);
  });
}

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
