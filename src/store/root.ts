import {combineReducers} from 'utils/redux';
import {reducer as app} from './slices/app';
import {reducer as hotseat} from './slices/hotseat';

const rootReducer = combineReducers({
  app,
  hotseat,
});

export {rootReducer as reducer};
