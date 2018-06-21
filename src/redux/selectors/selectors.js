import { orm } from '../models';
import { createSelector as ormCreateSelector } from 'redux-orm';
import { createSelector } from 'reselect';

export const ormSelector = state => state.orm;

// export const matches = createSelector(
//   ormSelector,
//   ormCreateSelector(orm => {
//     console.log('Running matches selector');
//     return orm.Match.all()
//       .toRefArray()
//       .map(match => {
//         const obj = Object.assign({}, match.ref);
//         obj.holes = match.holes.toRefArray();
//       });
//   })
// );

// export const match = createSelector(
//   ormSelector,
//   state => state.selectedMatchId,
//   ormCreateSelector((orm, selectedMatchId) => {
//     console.log('Running match selector');
//     return orm.Match.withId(selectedMatchId)
//       ? orm.Match.withId(selectedMatchId).ref
//       : {};
//   })
// );

// export const holes = createSelector(
//   ormSelector,
//   state => state.selectedMatchId,
//   orm.createSelector((orm, selectedMatchId) => {
//     console.log('Running holes selector');
//     return orm.Hole.withRefs.filter({ match: selectedMatchId }).map(hole => {
//       return hole;
//     });
//   })
// );
