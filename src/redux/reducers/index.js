import { combineReducers } from 'redux';
import ormReducer from './orm';
import createMatchReducer from './createMatch';
import playMatchReducer from './playMatch';
import matchDetailsReducer from './matchDetails';

const rootReducer = combineReducers({
  orm: ormReducer,
  createMatchState: createMatchReducer,
  playMatchState: playMatchReducer,
  matchDetailsState: matchDetailsReducer
});

export default rootReducer;
