import { combineReducers } from 'redux';
import ormReducer from './orm';
import createMatchReducer from './createMatch';

const rootReducer = combineReducers({
  orm: ormReducer,
  createMatchState: createMatchReducer
});

export default rootReducer;
