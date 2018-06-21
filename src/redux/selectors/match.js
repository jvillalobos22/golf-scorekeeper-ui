import { createSelector } from 'redux-orm';
import orm from '../models/index';

const dbStateSelector = state => state.orm;

const matchesSelector = createSelector(orm, dbStateSelector, session => {
  return session.Match.all()
    .toModelArray()
    .map(match => {
      const obj = match.ref;
      return Object.assign({}, obj, {
        holes: match.holes.toRefArray().map(hole => hole)
      });
    });
});

export { matchesSelector };
