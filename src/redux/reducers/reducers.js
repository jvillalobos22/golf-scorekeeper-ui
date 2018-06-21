import { SELECT_MATCH } from '../actions/actionTypes';

export function selectedMatchIdReducer(state = 0, action) {
  const { type, payload } = action;
  switch (type) {
    case SELECT_MATCH:
      return payload;
    default:
      return state;
  }
}
