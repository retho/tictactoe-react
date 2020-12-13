import {combineReducers} from 'utils/redux';
import {reducer as app} from './slices/app';
import {reducer as auth} from './slices/auth';
import {reducer as hotseat} from './slices/hotseat';

const rootReducer = combineReducers({
  app,
  auth,
  hotseat,
});

export {rootReducer as reducer};
