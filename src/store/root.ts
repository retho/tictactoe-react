import { combineReducers } from 'utils/redux';
import {reducer as app} from './slices/app';

const rootReducer = combineReducers({
  app,
});

export {rootReducer as reducer};
