import { combineReducers } from 'redux';
import ormReducer from './orm';

const rootReducer = combineReducers({
  orm: ormReducer
});

export default rootReducer;
