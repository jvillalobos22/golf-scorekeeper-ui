import { combineReducers } from 'redux';
import { selectedMatchIdReducer } from './reducers';
import ormReducer from './orm';

const rootReducer = combineReducers({
  orm: ormReducer,
  selecteMatchId: selectedMatchIdReducer
});

export default rootReducer;
