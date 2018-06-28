import { combineReducers } from 'redux';
import ormReducer from './orm';
import createMatchReducer from './createMatch';
import playMatchReducer from './playMatch';

const rootReducer = combineReducers({
  orm: ormReducer,
  createMatchState: createMatchReducer,
  playMatchState: playMatchReducer
});

export default rootReducer;
